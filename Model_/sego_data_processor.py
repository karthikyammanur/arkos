import os
import json
from pdf_extractor import process_pdf

class SEGODataProcessor:
    def __init__(self):
        """Initialize the SEGO data processor."""
        self.data_cache = {}
    
    def process_annual_report(self, pdf_path):
        """Process an annual report PDF and prepare it for the AI pipeline."""
        # Extract content from the PDF
        extracted_data = process_pdf(pdf_path)
        
        # Process the extracted data for the AI pipeline
        processed_data = self._prepare_for_ai_pipeline(extracted_data)
        
        return processed_data
    
    def _prepare_for_ai_pipeline(self, extracted_data):
        """Prepare the extracted data for the AI pipeline."""
        # Combine all text from all pages into a single document
        full_text = "\n".join([page["content"] for page in extracted_data["text"]])
        
        # Extract key financial metrics from tables
        financial_metrics = self._extract_financial_metrics(extracted_data["tables"])
        
        # Extract information about renewable energy from the text
        renewable_info = self._extract_renewable_energy_info(full_text)
        
        # Prepare the data for the AI pipeline
        prepared_data = {
            "document_text": full_text,
            "financial_metrics": financial_metrics,
            "renewable_energy_info": renewable_info,
            "metadata": extracted_data["metadata"],
            "tables": extracted_data["tables"],
            "images": extracted_data["images"]
        }
        
        return prepared_data
    
    def _extract_financial_metrics(self, tables):
        """Extract key financial metrics from tables."""
        financial_metrics = {
            "operational_costs": None,
            "infrastructure_spending": None,
            "renewable_investments": None,
            "revenue": None
        }
        
        # This is a simplified example - in a real implementation, you would need
        # more sophisticated logic to identify and extract specific financial metrics
        for table in tables:
            for row in table["processed_data"]:
                # Look for operational costs
                if any(key in str(row).lower() for key in ["operational cost", "operating expense", "opex"]):
                    # Extract the value (this is simplified)
                    for key, value in row.items():
                        if isinstance(value, str) and any(c.isdigit() for c in value):
                            financial_metrics["operational_costs"] = value
                
                # Look for infrastructure spending
                if any(key in str(row).lower() for key in ["infrastructure", "capital expenditure", "capex"]):
                    for key, value in row.items():
                        if isinstance(value, str) and any(c.isdigit() for c in value):
                            financial_metrics["infrastructure_spending"] = value
                
                # Look for renewable investments
                if any(key in str(row).lower() for key in ["renewable", "solar", "wind", "green energy"]):
                    for key, value in row.items():
                        if isinstance(value, str) and any(c.isdigit() for c in value):
                            financial_metrics["renewable_investments"] = value
                
                # Look for revenue
                if any(key in str(row).lower() for key in ["revenue", "income", "earnings"]):
                    for key, value in row.items():
                        if isinstance(value, str) and any(c.isdigit() for c in value):
                            financial_metrics["revenue"] = value
        
        return financial_metrics
    
    def _extract_renewable_energy_info(self, text):
        """Extract information about renewable energy from the text."""
        renewable_info = {
            "solar_mentioned": "solar" in text.lower(),
            "wind_mentioned": "wind" in text.lower(),
            "hydro_mentioned": "hydro" in text.lower(),
            "battery_storage_mentioned": "battery storage" in text.lower()
        }
        
        # Count mentions of different renewable sources
        renewable_info["solar_count"] = text.lower().count("solar")
        renewable_info["wind_count"] = text.lower().count("wind")
        renewable_info["hydro_count"] = text.lower().count("hydro")
        renewable_info["battery_storage_count"] = text.lower().count("battery storage")
        
        return renewable_info

# Example usage
if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        pdf_path = sys.argv[1]
    else:
        pdf_path = input("Enter the path to the annual report PDF: ")
    
    processor = SEGODataProcessor()
    processed_data = processor.process_annual_report(pdf_path)
    
    # Save the processed data to a JSON file
    output_path = "processed_annual_report.json"
    with open(output_path, "w") as f:
        json.dump(processed_data, f, indent=4)
    
    print(f"Processing complete. Data saved to {output_path}")
