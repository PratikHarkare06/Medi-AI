import { useState } from 'react';
import './App.css';
import UploadSection from './components/UploadSection';
import ResultsDisplay from './components/ResultsDisplay';
import { analyzePrescription } from './services/api';

function App() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    const handleImageSelect = (file) => {
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
        setResults(null);
        setError(null);
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        setResults(null);
        setError(null);
    };

    const handleAnalyze = async () => {
        if (!selectedImage) return;

        setLoading(true);
        setError(null);

        try {
            const data = await analyzePrescription(selectedImage);
            setResults(data);
        } catch (err) {
            setError({
                title: 'Analysis Failed',
                message: err.message || 'Unable to analyze the prescription. Please try again with a clearer image.'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleNewScan = () => {
        setSelectedImage(null);
        setImagePreview(null);
        setResults(null);
        setError(null);
    };

    return (
        <div className="app">
            <div className="container">
                {/* Header */}
                <header className="header">
                    <div className="header-icon">💊</div>
                    <h1>MediScript AI</h1>
                    <p className="header-subtitle">
                        AI-Powered Prescription Scanner & Medicine Translator
                    </p>
                    <p className="header-description">
                        Transform handwritten prescriptions into clear, understandable instructions in your preferred language
                    </p>
                </header>

                {/* Disclaimer */}
                <div className="disclaimer">
                    <span className="disclaimer-icon">⚠️</span>
                    <div className="disclaimer-text">
                        <strong>Important:</strong> This app only explains your doctor's prescription.
                        It does not provide medical advice or diagnosis. Always follow your doctor's instructions
                        and consult a healthcare professional if you have questions.
                    </div>
                </div>

                {/* Main Content */}
                <main>
                    {!results ? (
                        <div className="glass-card">
                            <UploadSection
                                onImageSelect={handleImageSelect}
                                imagePreview={imagePreview}
                                onRemoveImage={handleRemoveImage}
                                loading={loading}
                            />

                            {selectedImage && !loading && (
                                <div className="btn-group">
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleAnalyze}
                                    >
                                        <span>🔍</span>
                                        Analyze Prescription
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={handleRemoveImage}
                                    >
                                        <span>🗑️</span>
                                        Remove Image
                                    </button>
                                </div>
                            )}

                            {loading && (
                                <div className="loading">
                                    <div className="spinner"></div>
                                    <p className="loading-text">Analyzing your prescription...</p>
                                    <p className="loading-hint">
                                        Our AI is reading the handwriting and extracting medicine information
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="error-message">
                                    <span className="error-icon">❌</span>
                                    <div className="error-content">
                                        <h3>{error.title}</h3>
                                        <p>{error.message}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <ResultsDisplay
                            results={results}
                            onNewScan={handleNewScan}
                            imagePreview={imagePreview}
                        />
                    )}
                </main>

                {/* Footer */}
                <footer className="footer">
                    <p className="footer-text">
                        © 2026 MediScript AI. Powered by Google Gemini AI.
                    </p>
                    <p className="footer-text">
                        Made with ❤️ for better healthcare accessibility
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default App;
