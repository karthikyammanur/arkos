import fitz  # PyMuPDF
import pdfplumber
import io
import os
import json
from PIL import Image
import numpy as np

class PDFExtractor:
    def __init__(self, pdf_path):
        """Initialize the PDF extractor with the path to the PDF file."""
        self.pdf_path = pdf_path
        self.extracted_data = {
            "metadata": {},
            "text": [],
            "tables": [],
            "images": []
        }
    
    def extract_all(self, output_folder="extracted_content"):
        """Extract all content from the PDF file."""
        # Create output folder if it doesn't exist
        if not os.path.exists(output_folder):
            os.makedirs(output_folder)
            os.makedirs(os.path.join(output_folder, "images"))
        
        # Extract metadata, text, tables, and images
        self.extract_metadata()
        self.extract_text_with_pymupdf()
        self.extract_tables_with_pdfplumber()
        self.extract_images()
        
        # Save the extracted data to a JSON file
        with open(os.path.join(output_folder, "extracted_data.json"), "w") as f:
            json.dump(self.extracted_data, f, indent=4)
        
        return self.extracted_data #Send to model
    
    def extract_metadata(self):
        """Extract metadata from the PDF file."""
        doc = fitz.open(self.pdf_path)
        self.extracted_data["metadata"] = {
            "title": doc.metadata.get("title", ""),
            "author": doc.metadata.get("author", ""),
            "subject": doc.metadata.get("subject", ""),
            "keywords": doc.metadata.get("keywords", ""),
            "creator": doc.metadata.get("creator", ""),
            "producer": doc.metadata.get("producer", ""),
            "creation_date": doc.metadata.get("creationDate", ""),
            "modification_date": doc.metadata.get("modDate", ""),
            "page_count": len(doc)
        }
        doc.close()
    
    def extract_text_with_pymupdf(self):
        """Extract text from the PDF file using PyMuPDF."""
        doc = fitz.open(self.pdf_path)
        for page_num, page in enumerate(doc):
            text = page.get_text()
            self.extracted_data["text"].append({
                "page_number": page_num + 1,
                "content": text
            })
        doc.close()
    
    def extract_tables_with_pdfplumber(self):
        """Extract tables from the PDF file using pdfplumber."""
        with pdfplumber.open(self.pdf_path) as pdf:
            for page_num, page in enumerate(pdf.pages):
                tables = page.extract_tables()
                if tables:
                    for table_num, table in enumerate(tables):
                        # Convert table to a list of dictionaries for better JSON serialization
                        processed_table = []
                        if table and len(table) > 0:
                            headers = table[0]
                            for row in table[1:]:
                                row_dict = {}
                                for i, cell in enumerate(row):
                                    if i < len(headers) and headers[i] is not None:
                                        header = headers[i]
                                    else:
                                        header = f"Column_{i}"
                                    row_dict[header] = cell
                                processed_table.append(row_dict)
                            
                            self.extracted_data["tables"].append({
                                "page_number": page_num + 1,
                                "table_number": table_num + 1,
                                "raw_data": table,
                                "processed_data": processed_table
                            })
    
    def extract_images(self):
        """Extract images from the PDF file using PyMuPDF."""
        doc = fitz.open(self.pdf_path)
        image_count = 0
        
        for page_num, page in enumerate(doc):
            image_list = page.get_images(full=True)
            
            for img_index, img in enumerate(image_list):
                xref = img[0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]
                
                # Save the image to a file
                image_filename = f"image_page{page_num+1}_{img_index+1}.{image_ext}"
                image_path = os.path.join("extracted_content", "images", image_filename)
                with open(image_path, "wb") as img_file:
                    img_file.write(image_bytes)
                
                # Get image dimensions
                image = Image.open(io.BytesIO(image_bytes))
                width, height = image.size
                
                # Add image metadata to the extracted data
                self.extracted_data["images"].append({
                    "page_number": page_num + 1,
                    "image_number": img_index + 1,
                    "filename": image_filename,
                    "format": image_ext,
                    "width": width,
                    "height": height,
                    "path": image_path
                })
                
                image_count += 1
        
        doc.close()
        return image_count

# Function to process a PDF file
def process_pdf(pdf_path, output_folder="extracted_content"):
    """Process a PDF file and extract its content."""
    extractor = PDFExtractor(pdf_path)
    extracted_data = extractor.extract_all(output_folder)
    print(f"Extraction complete. Data saved to {output_folder}/extracted_data.json")
    return extracted_data

# Example usage
if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        pdf_path = sys.argv[1]
    else:
        pdf_path = input("Enter the path to the PDF file: ")
    
    process_pdf(pdf_path)