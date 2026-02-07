import axios from 'axios';

const API_BASE_URL = '/api';

export const analyzePrescription = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('prescription', imageFile);

        const response = await axios.post(`${API_BASE_URL}/analyze`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: 30000, // 30 seconds timeout
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            // Server responded with error
            throw new Error(error.response.data.error || 'Server error occurred');
        } else if (error.request) {
            // Request made but no response
            throw new Error('No response from server. Please check your connection.');
        } else {
            // Error setting up request
            throw new Error('Failed to send request. Please try again.');
        }
    }
};
