import { GoogleGenerativeAI } from '@google/generative-ai';
import { analyzePrescriptionWithOpenRouter } from './openRouterOCR.js';
import fs from 'fs';

export async function analyzePrescriptionImage(imagePath) {
    // Debug logging
    const logError = (msg) => {
        const logMsg = `${new Date().toISOString()} - ${msg}\n`;
        try { fs.appendFileSync('debug.log', logMsg); } catch (e) { }
        console.error(msg);
    };

    // Initialize Gemini
    const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;
    let openRouterError = null;

    // 1. Try Google Gemini (Free Tier & Robust) - FIRST PRIORITY
    if (genAI) {
        try {
            logError('🔍 Using Google Gemini OCR...');
            // Read image file
            const imageData = fs.readFileSync(imagePath);
            const base64Image = imageData.toString('base64');

            // Get Gemini Vision model - using Flash Lite for better quota availability
            const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite-preview-02-05' });
            // Note: If preview fails, fallback to 'gemini-2.0-flash' which we know exists but was 429'd.

            const prompt = `You are a medical OCR expert. Extract the text from this prescription image accurately.`;

            const result = await model.generateContent([
                prompt,
                { inlineData: { mimeType: 'image/jpeg', data: base64Image } }
            ]);

            const response = await result.response;
            const text = response.text();

            logError('✅ Gemini OCR successful');
            return text;

        } catch (error) {
            logError(`⚠️ Gemini OCR Error: ${error.message}. Falling back to OpenRouter...`);
        }
    }

    // 2. Fallback to OpenRouter
    if (process.env.OPENROUTER_API_KEY) {
        try {
            logError('🔍 Using OpenRouter OCR...');
            // Log key prefix for debugging
            logError(`Key prefix: ${process.env.OPENROUTER_API_KEY.substring(0, 10)}...`);

            const text = await analyzePrescriptionWithOpenRouter(imagePath);
            logError(`✅ OpenRouter OCR result (first 100 chars): ${text.substring(0, 100).replace(/\n/g, ' ')}...`);
            return text;
        } catch (error) {
            openRouterError = error;
            logError(`⚠️ OpenRouter OCR failed: ${error.message}`);
            logError('🔄 Falling back to Gemini...');
        }
    }

    if (openRouterError) {
        throw new Error(`All OCR methods failed. Gemini/Python failed. OpenRouter: ${openRouterError.message}`);
    }

    throw new Error('Failed to analyze prescription. Please check your internet connection or API keys.');
}
