import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateTextWithOpenRouter } from './openRouterOCR.js';

export async function extractMedicalEntities(extractedText) {
    // try/catch block to handle different API providers
    try {
        const prompt = `You are a medical NLP expert. Parse this prescription text and extract structured medical information.

Prescription Text:
${extractedText}

Extract and structure the information in the following JSON format:
{
  "medicines": [
    {
      "name": "Medicine name (generic or brand)",
      "dosage": "Dosage amount (e.g., 500mg, 10ml)",
      "frequency": "How often to take (in simple English, e.g., 'Twice daily', 'Three times a day')",
      "duration": "How long to take (e.g., '5 days', '1 week')",
      "instructions": "Special instructions (e.g., 'Take after food', 'Take before sleep')"
    }
  ],
  "summary": "A brief, patient-friendly summary of all medicines and instructions",
  "confidence": 85
}

Important:
1. **Infer Medicine Names**: If OCR text is misspelled (e.g., "Paracetmol"), correct it to the known medicine name ("Paracetamol").
2. **Standardize Frequency**: Convert abbreviations like "1-0-1", "BD", "Twice" to plain English "Twice daily".
3. **Handle Messy Input**: The input text may be unstructured. Look for patterns like "Name Dose Freq".
4. **Instructions**: Make them very simple for the patient.
5. If a line is clearly not a medicine, ignore it.
6. Provide a confidence score (0-100).
7. Return ONLY valid JSON.

Return the JSON now:`;

        let text = '';

        // Try OpenRouter first if configured
        if (process.env.OPENROUTER_API_KEY) {
            try {
                // Log the start of NLP processing
                const logMsg = `${new Date().toISOString()} - 🧠 Starting NLP with OpenRouter...\n`;
                const fs = await import('fs');
                fs.appendFileSync('debug.log', logMsg);

                text = await generateTextWithOpenRouter(prompt);

                fs.appendFileSync('debug.log', `${new Date().toISOString()} - ✅ OpenRouter NLP Raw Response: ${text}\n`);
                console.log('✅ OpenRouter NLP successful');
            } catch (error) {
                const fs = await import('fs');
                fs.appendFileSync('debug.log', `${new Date().toISOString()} - ⚠️ OpenRouter NLP failed: ${error.message}\n`);
                console.warn('⚠️ OpenRouter NLP failed, falling back to Gemini...', error.message);
            }
        }

        // Fallback to Gemini if text is still empty
        if (!text) {
            const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

            if (!genAI || !process.env.GEMINI_API_KEY) {
                throw new Error('No AI API key configured. Please add OPENROUTER_API_KEY or GEMINI_API_KEY.');
            }

            console.log('🔍 Using Gemini for NLP...');
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            text = response.text();
        }

        // Clean up response - remove markdown code blocks if present
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        // Parse JSON
        const medicalData = JSON.parse(text);

        // Validate structure
        if (!medicalData.medicines || !Array.isArray(medicalData.medicines)) {
            throw new Error('Invalid response structure from AI');
        }

        // Ensure all medicines have required fields
        medicalData.medicines = medicalData.medicines.map(med => ({
            name: med.name || 'Unknown Medicine',
            dosage: med.dosage || 'As prescribed',
            frequency: med.frequency || 'As directed',
            duration: med.duration || 'As advised by doctor',
            instructions: med.instructions || 'Follow doctor\'s instructions'
        }));

        // Generate summary if not provided
        if (!medicalData.summary) {
            medicalData.summary = generateSummary(medicalData.medicines);
        }

        // Set default confidence if not provided
        if (!medicalData.confidence) {
            medicalData.confidence = 75;
        }

        return medicalData;

    } catch (error) {
        console.error('NLP Error:', error);

        // Return fallback structure
        return {
            medicines: [
                {
                    name: 'Unable to extract medicine information',
                    dosage: 'Please consult your doctor',
                    frequency: 'As prescribed',
                    duration: 'As advised',
                    instructions: 'Please verify with your healthcare provider'
                }
            ],
            summary: 'We encountered difficulty processing this prescription. Please consult your pharmacist or doctor for clarification.',
            confidence: 30
        };
    }
}

function generateSummary(medicines) {
    if (!medicines || medicines.length === 0) {
        return 'No medicines found in prescription.';
    }

    const medicineList = medicines.map(m => m.name).join(', ');
    return `You have been prescribed ${medicines.length} medicine(s): ${medicineList}. Please follow the dosage and timing instructions carefully. Take medicines as directed by your doctor.`;
}
