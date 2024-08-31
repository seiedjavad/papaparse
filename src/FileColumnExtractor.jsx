import React, {useState} from 'react';
import Papa from 'papaparse';
import './FileColumnExtractor.css';

const FileColumnExtractor = () => {
    const [columns, setColumns] = useState([]);
    const [fileName, setFileName] = useState('');

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            const fileNameLower = file.name.toLowerCase();

            if (fileNameLower.endsWith('.csv')) {
                processCSV(file);
            } else if (fileNameLower.endsWith('.json')) {
                processJSON(file);
            } else if (fileNameLower.endsWith('.jsonl')) {
                processJSONL(file);
            } else {
                alert('Unsupported file format.');
            }
        }
    };

    const processCSV = (file) => {
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: (results) => {
                const fields = results.meta.fields;
                setColumns(fields);
            },
            error: (error) => {
                console.error("Error parsing the CSV file: ", error);
            }
        });
    };

    const processJSON = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const json = JSON.parse(e.target.result);
            const fields = json.length > 0 ? Object.keys(json[0]) : [];
            setColumns(fields);
        };
        reader.readAsText(file);
    };

    const processJSONL = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const lines = e.target.result.split('\n').filter(line => line.trim() !== '');
            const json = lines.map(line => JSON.parse(line));
            const fields = json.length > 0 ? Object.keys(json[0]) : [];
            setColumns(fields);
        };
        reader.readAsText(file);
    };

    return (
        <div className="upload-container">
            <input type="file" id="file-upload" accept=".csv,.json,.jsonl" onChange={handleFileUpload}/>
            <label htmlFor="file-upload" className="upload-label">
                <div className="upload-box">
                    Click or Drag to Upload a File
                </div>
            </label>

            {fileName && (
                <div className="file-info">
                    <p><strong>Selected File:</strong> {fileName}</p>
                </div>
            )}
            {columns.length > 0 && (
                <div className="columns-container">
                    <h3>File Columns:</h3>
                    <ul style={{display: 'flex', gap: 10}}>
                        {columns.map((column, index) => (
                            <li key={index} style={{minWidth: 100, textAlign: 'center'}}>{column}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FileColumnExtractor;
