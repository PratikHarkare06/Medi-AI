import axios from 'axios';
import fs from 'fs';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function analyzePrescriptionWithOpenRouter(imagePath) {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    try {
        // Read image file and convert to base64
        const imageData = fs.readFileSync(imagePath);
        const base64Image = imageData.toString('base64');
        const mimeType = 'image/jpeg';

        // Create the API request
        const response = await axios.post(
            OPENROUTER_API_URL,
            {
                model: 'openai/gpt-4o-mini', // Reverting to GPT-4o-mini for reliability
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: `Extract the handwritten text from this document for digital records.
                                
Please identify and list:
- Any medication names
- Dosage instructions
- Durations
- Frequencies

Transcribe exactly what you see. If unsure, mark as [unclear].`
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: `data:${mimeType};base64,${base64Image}`
                                }
                            }
                        ]
                    }
                ],
                max_tokens: 1000
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:3000',
                    'X-Title': 'MediScript AI'
                }
            }
        );

        const text = response.data.choices[0].message.content;

        if (!text || text.trim().length === 0) {
            throw new Error('No text could be extracted from the image. Please ensure the image is clear and contains a prescription.');
        }

        return text;

    } catch (error) {
        console.error('OpenRouter OCR Error:', error.response?.data || error.message);

        if (error.response?.status === 401) {
            throw new Error('Invalid OpenRouter API key. Please check your configuration.');
        }

        if (error.response?.status === 429) {
            throw new Error('Rate limit exceeded. Please try again in a moment.');
        }

        throw new Error('Failed to read prescription image: ' + (error.response?.data?.error?.message || error.message));
    }
}

export async function generateTextWithOpenRouter(prompt) {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    try {
        const response = await axios.post(
            OPENROUTER_API_URL,
            {
                model: 'openai/gpt-4o-mini', // Reverting to GPT-4o-mini for reliability
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 1000
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:3000',
                    'X-Title': 'MediScript AI'
                }
            }
        );

        const text = response.data.choices[0].message.content;
        return text;

    } catch (error) {
        console.error('OpenRouter Text Generation Error:', error.response?.data || error.message);
        throw error;
    }
}
