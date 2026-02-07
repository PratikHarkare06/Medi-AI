import { useState, useEffect } from 'react';

function VoicePlayer({ text, language }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [synthesis, setSynthesis] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            setSynthesis(window.speechSynthesis);
        }
    }, []);

    const handlePlay = () => {
        if (!synthesis || !text) return;

        if (isPlaying) {
            synthesis.cancel();
            setIsPlaying(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'hindi' ? 'hi-IN' : 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1;

        utterance.onend = () => {
            setIsPlaying(false);
        };

        utterance.onerror = () => {
            setIsPlaying(false);
            alert('Voice playback is not supported in your browser');
        };

        synthesis.speak(utterance);
        setIsPlaying(true);
    };

    useEffect(() => {
        return () => {
            if (synthesis) {
                synthesis.cancel();
            }
        };
    }, [synthesis]);

    if (!synthesis) {
        return null;
    }

    return (
        <div className="voice-player">
            <div className="voice-info">
                <span className="voice-icon">🔊</span>
                <div className="voice-text">
                    <div className="voice-title">Listen to Instructions</div>
                    <div className="voice-subtitle">
                        {isPlaying ? 'Playing...' : 'Click to hear the prescription details'}
                    </div>
                </div>
            </div>
            <button
                className={`voice-btn ${isPlaying ? 'playing' : ''}`}
                onClick={handlePlay}
            >
                <span>{isPlaying ? '⏸️' : '▶️'}</span>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    );
}

export default VoicePlayer;
