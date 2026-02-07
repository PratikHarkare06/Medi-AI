import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateTextWithOpenRouter } from './openRouterOCR.js';

export async function translateToHindi(medicalData) {
    try {
        const prompt = `You are a medical translator. Translate this prescription information from English to Hindi.

English Data:
${JSON.stringify(medicalData, null, 2)}

Translate all medicine instructions, dosage information, and summary to Hindi while keeping:
1. Medicine names in English (don't translate brand/generic names)
2. Dosage numbers in English (e.g., 500mg stays as 500mg)
3. Translate frequency, duration, and instructions to simple Hindi

Return the translated data in the same JSON structure:
{
  "medicines": [
    {
      "name": "Medicine name (keep in English)",
      "dosage": "500mg (keep numbers in English)",
      "frequency": "दिन में दो बार (translate to Hindi)",
      "duration": "5 दिन (translate to Hindi)",
      "instructions": "खाने के बाद लें (translate to Hindi)"
    }
  ],
  "summary": "Translated summary in Hindi"
}

Return ONLY valid JSON, no additional text:`;

        let text = '';

        // Try OpenRouter first if configured (same as OCR strategy)
        if (process.env.OPENROUTER_API_KEY) {
            try {
                console.log('🔍 Using OpenRouter for Translation...');
                text = await generateTextWithOpenRouter(prompt);
                console.log('✅ OpenRouter Translation successful');
            } catch (error) {
                console.warn('⚠️ OpenRouter Translation failed, falling back to Gemini...', error.message);
            }
        }

        // Fallback to Gemini if text is still empty
        if (!text) {
            const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

            if (!genAI || !process.env.GEMINI_API_KEY) {
                // If no API key for translation, throw error which will be caught below
                throw new Error('No AI API key for translation.');
            }

            console.log('🔍 Using Gemini for Translation...');
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            text = response.text();
        }

        // Clean up response
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        // Parse JSON
        const hindiData = JSON.parse(text);

        // Validate structure
        if (!hindiData.medicines || !Array.isArray(hindiData.medicines)) {
            throw new Error('Invalid translation response');
        }

        return hindiData;

    } catch (error) {
        console.error('Translation Error:', error);

        // Return fallback - simple Hindi translations using dictionary
        const fallbackData = {
            medicines: medicalData.medicines.map(med => ({
                name: med.name,
                dosage: med.dosage,
                frequency: translateFrequency(med.frequency),
                duration: translateDuration(med.duration),
                instructions: translateInstructions(med.instructions)
            })),
            summary: 'कृपया अपने डॉक्टर के निर्देशों का पालन करें।'
        };

        return fallbackData;
    }
}

// Fallback translation functions (Dictionary based)
function translateFrequency(freq) {
    if (!freq) return '';
    const translations = {
        'once daily': 'दिन में एक बार',
        'twice daily': 'दिन में दो बार',
        'three times daily': 'दिन में तीन बार',
        'four times daily': 'दिन में चार बार',
        'as needed': 'आवश्यकता अनुसार',
        'as directed': 'निर्देशानुसार'
    };

    const lowerFreq = freq.toLowerCase();
    for (const [eng, hindi] of Object.entries(translations)) {
        if (lowerFreq.includes(eng)) {
            return hindi;
        }
    }

    return freq; // Return original if no match
}

function translateDuration(duration) {
    if (!duration) return '';
    const translations = {
        'day': 'दिन',
        'days': 'दिन',
        'week': 'सप्ताह',
        'weeks': 'सप्ताह',
        'month': 'महीना',
        'months': 'महीने'
    };

    let translated = duration.toLowerCase();
    for (const [eng, hindi] of Object.entries(translations)) {
        translated = translated.replace(eng, hindi);
    }

    return translated;
}

function translateInstructions(instructions) {
    if (!instructions) return '';
    const translations = {
        'after food': 'खाने के बाद',
        'before food': 'खाने से पहले',
        'with food': 'खाने के साथ',
        'before sleep': 'सोने से पहले',
        'in the morning': 'सुबह',
        'at night': 'रात में',
        'empty stomach': 'खाली पेट'
    };

    let translated = instructions.toLowerCase();
    for (const [eng, hindi] of Object.entries(translations)) {
        if (translated.includes(eng)) {
            translated = translated.replace(eng, hindi);
        }
    }

    return translated;
}
