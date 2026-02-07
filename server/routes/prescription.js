import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { analyzePrescriptionImage } from '../services/ocrService.js';
import { extractMedicalEntities } from '../services/nlpService.js';
import { translateToHindi } from '../services/translateService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'prescription-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed (JPEG, PNG, WEBP)'));
        }
    }
});

// Analyze prescription endpoint
router.post('/analyze', upload.single('prescription'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file uploaded' });
        }

        console.log('📸 Processing prescription:', req.file.filename);

        // Step 1: OCR - Extract text from image using Gemini Vision
        const extractedText = await analyzePrescriptionImage(req.file.path);
        console.log('📝 Extracted text:', extractedText);

        // Step 2: NLP - Extract medical entities
        const medicalData = await extractMedicalEntities(extractedText);
        console.log('💊 Extracted medical data:', medicalData);

        // Step 3: Translate to Hindi
        const hindiData = await translateToHindi(medicalData);
        console.log('🇮🇳 Translated to Hindi');

        // Step 4: Prepare response
        const response = {
            success: true,
            confidence: medicalData.confidence || 85,
            english: {
                medicines: medicalData.medicines,
                summary: medicalData.summary
            },
            hindi: {
                medicines: hindiData.medicines,
                summary: hindiData.summary
            },
            rawText: extractedText,
            timestamp: new Date().toISOString()
        };

        res.json(response);

    } catch (error) {
        console.error('❌ Error analyzing prescription:', error);
        res.status(500).json({
            error: 'Failed to analyze prescription',
            message: error.message
        });
    }
});

export default router;
