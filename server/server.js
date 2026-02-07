import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prescriptionRoutes from './routes/prescription.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', prescriptionRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'MediScript AI Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 MediScript AI Server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`📍 API endpoint: http://localhost:${PORT}/api`);
});
