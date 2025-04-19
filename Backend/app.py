from flask import Flask, request, jsonify
import os
import tempfile
from sego_data_processor import SEGODataProcessor

app = Flask(__name__)
processor = SEGODataProcessor()

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/api/process-pdf', methods=['POST'])
def process_pdf_api():
    """API endpoint to process a PDF file."""
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and file.filename.endswith('.pdf'):
        # Save the uploaded file
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        
        try:
            # Process the PDF file
            processed_data = processor.process_annual_report(file_path)
            return jsonify({"success": True, "data": processed_data})
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "File must be a PDF"}), 400

@app.route('/api/query-pdf', methods=['POST'])
def query_pdf():
    """API endpoint to query information from a processed PDF."""
    data = request.json
    if not data or 'query' not in data or 'file_path' not in data:
        return jsonify({"error": "Missing query or file_path"}), 400
    
    query = data['query']
    file_path = data['file_path']
    
    # Check if the file exists
    if not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 404
    
    try:
        # Process the PDF file if not already processed
        if file_path not in processor.data_cache:
            processor.data_cache[file_path] = processor.process_annual_report(file_path)
        
        processed_data = processor.data_cache[file_path]
        
        # Simple query processing (in a real implementation, you would use an LLM here)
        if "solar" in query.lower() and "operational costs" in query.lower():
            return jsonify({
                "answer": "Based on the annual report, solar energy adoption has impacted operational costs. " +
                          f"The report mentions solar {processed_data['renewable_energy_info']['solar_count']} times. " +
                          f"Operational costs are reported as {processed_data['financial_metrics']['operational_costs']}."
            })
        elif "infrastructure spending" in query.lower():
            return jsonify({
                "answer": f"The forecasted infrastructure spending according to the annual report is " +
                          f"{processed_data['financial_metrics']['infrastructure_spending']}."
            })
        else:
            return jsonify({
                "answer": "I couldn't find specific information related to your query in the annual report."
            })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)