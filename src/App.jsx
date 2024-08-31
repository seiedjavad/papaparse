import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import csvLogo from './assets/csv.png';
import jsonLogo from './assets/json.png';
import './App.css';
import FileColumnExtractor from "./FileColumnExtractor.jsx";

function App() {
    const [count, setCount] = useState(0);
    const [fileName, setFileName] = useState('');
    const [fileExtension, setFileExtension] = useState('');

    // Function to handle file selection
    const handleFileSelect = (file) => {
        if (file) {
            setFileName(file.name);
            const extension = file.name.split('.').pop();
            setFileExtension(extension.toUpperCase());
        }
    };

    return (
        <>
            <div className="App">
                <h1>File Column Extractor (CSV, JSON, JSONL)</h1>
                <FileColumnExtractor onFileSelect={handleFileSelect} />
                {fileName && (
                    <div className="file-info">
                        <p><strong>File Name:</strong> {fileName}</p>
                        <p><strong>File Extension:</strong> {fileExtension}</p>
                    </div>
                )}
            </div>

            <div className="card">
                <h2>About the Component</h2>
                <p>
                    This React component allows users to upload and process files in <span className="highlight">CSV</span>, <span className="highlight">JSON</span>, or <span className="highlight">JSONL</span> formats. Once a file is uploaded, the component reads the file, extracts the column headers, and displays them in a list.
                </p>
                <ul className="features-list">
                    <li>CSV Files: Utilizes the <code>papaparse</code> library to parse CSV files and extract the column headers.</li>
                    <li>JSON Files: Reads and parses JSON files, extracting the keys of the first object as column headers.</li>
                    <li>JSONL Files: Handles JSON Lines files by parsing each line as a JSON object and extracting the keys of the first object as column headers.</li>
                </ul>
                <p className="description">
                    The component automatically detects the file format based on the file extension (<span className="highlight">.csv</span>, <span className="highlight">.json</span>, <span className="highlight">.jsonl</span>) and processes it accordingly.
                </p>
                <p className="description">
                    This component is useful for applications where users need to quickly view and interact with the structure of data files in different formats.
                </p>
            </div>

            <div className="logos">
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo " alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react logoAnim" alt="React logo" />
                </a>
                <a href="https://json.dev" target="_blank">
                    <img src={jsonLogo} className="logo " alt="JSON logo" />
                </a>
                <a href="https://csv.dev" target="_blank">
                    <img src={csvLogo} className="logo " alt="CSV logo" />
                </a>
            </div>
        </>
    );
}

export default App;
