import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function UploadSection({ onImageSelect, imagePreview, onRemoveImage, loading }) {
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
            alert('Please upload a valid image file (JPG, PNG, or WEBP)');
            return;
        }

        if (acceptedFiles.length > 0) {
            onImageSelect(acceptedFiles[0]);
        }
    }, [onImageSelect]);

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        maxFiles: 1,
        disabled: loading
    });

    return (
        <div className="upload-section">
            <h2 className="section-title">
                <span className="section-icon">📸</span>
                Upload Prescription
            </h2>

            {!imagePreview ? (
                <div
                    {...getRootProps()}
                    className={`dropzone ${isDragActive ? 'active' : ''} ${isDragReject ? 'rejected' : ''}`}
                >
                    <input {...getInputProps()} />
                    <div className="dropzone-icon">
                        {isDragActive ? '📥' : '📄'}
                    </div>
                    <p className="dropzone-text">
                        {isDragActive
                            ? 'Drop your prescription here...'
                            : 'Drag & drop your prescription image here'}
                    </p>
                    <p className="dropzone-hint">
                        or click to browse • Supports JPG, PNG, WEBP
                    </p>
                </div>
            ) : (
                <div className="image-preview">
                    <img src={imagePreview} alt="Prescription preview" className="preview-img" />
                    {!loading && (
                        <button
                            className="remove-image-btn"
                            onClick={onRemoveImage}
                            aria-label="Remove image"
                        >
                            ✕
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default UploadSection;
