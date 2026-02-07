import { useState } from 'react';
import VoicePlayer from './VoicePlayer';

function ResultsDisplay({ results, onNewScan, imagePreview }) {
    const [selectedLanguage, setSelectedLanguage] = useState('english');

    const currentResults = results[selectedLanguage] || results.english;
    const confidence = results.confidence || 85;

    const getConfidenceClass = (score) => {
        if (score >= 80) return 'confidence-high';
        if (score >= 60) return 'confidence-medium';
        return 'confidence-low';
    };

    const getConfidenceIcon = (score) => {
        if (score >= 80) return '✅';
        if (score >= 60) return '⚠️';
        return '❌';
    };

    return (
        <div className="results-section">
            <div className="glass-card">
                {/* Results Header */}
                <div className="results-header">
                    <h2 className="section-title">
                        <span className="section-icon">📋</span>
                        Prescription Analysis
                    </h2>
                    <div className={`confidence-badge ${getConfidenceClass(confidence)}`}>
                        <span>{getConfidenceIcon(confidence)}</span>
                        <span>Confidence: {confidence}%</span>
                    </div>
                </div>

                {/* Language Tabs */}
                <div className="language-tabs">
                    <button
                        className={`language-tab ${selectedLanguage === 'english' ? 'active' : ''}`}
                        onClick={() => setSelectedLanguage('english')}
                    >
                        🇬🇧 English
                    </button>
                    <button
                        className={`language-tab ${selectedLanguage === 'hindi' ? 'active' : ''}`}
                        onClick={() => setSelectedLanguage('hindi')}
                    >
                        🇮🇳 हिंदी
                    </button>
                </div>

                {/* Medicine Cards */}
                <div className="medicine-grid">
                    {currentResults.medicines && currentResults.medicines.map((medicine, index) => (
                        <div key={index} className="medicine-card">
                            <h3 className="medicine-name">
                                <span>💊</span>
                                {medicine.name}
                            </h3>
                            <div className="medicine-details">
                                {medicine.dosage && (
                                    <div className="detail-row">
                                        <span className="detail-icon">⚖️</span>
                                        <div className="detail-content">
                                            <div className="detail-label">Dosage</div>
                                            <div className="detail-value">{medicine.dosage}</div>
                                        </div>
                                    </div>
                                )}
                                {medicine.frequency && (
                                    <div className="detail-row">
                                        <span className="detail-icon">🕐</span>
                                        <div className="detail-content">
                                            <div className="detail-label">Frequency</div>
                                            <div className="detail-value">{medicine.frequency}</div>
                                        </div>
                                    </div>
                                )}
                                {medicine.duration && (
                                    <div className="detail-row">
                                        <span className="detail-icon">📅</span>
                                        <div className="detail-content">
                                            <div className="detail-label">Duration</div>
                                            <div className="detail-value">{medicine.duration}</div>
                                        </div>
                                    </div>
                                )}
                                {medicine.instructions && (
                                    <div className="detail-row">
                                        <span className="detail-icon">ℹ️</span>
                                        <div className="detail-content">
                                            <div className="detail-label">Instructions</div>
                                            <div className="detail-value">{medicine.instructions}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Voice Player */}
                <VoicePlayer
                    text={currentResults.summary || ''}
                    language={selectedLanguage}
                />

                {/* Action Buttons */}
                <div className="btn-group">
                    <button className="btn btn-primary" onClick={onNewScan}>
                        <span>🔄</span>
                        Scan New Prescription
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => window.print()}
                    >
                        <span>🖨️</span>
                        Print Results
                    </button>
                </div>
            </div>

            {/* Original Image Reference */}
            {imagePreview && (
                <div className="glass-card" style={{ marginTop: '2rem' }}>
                    <h3 className="section-title">
                        <span className="section-icon">🖼️</span>
                        Original Prescription
                    </h3>
                    <div className="image-preview">
                        <img src={imagePreview} alt="Original prescription" className="preview-img" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResultsDisplay;
