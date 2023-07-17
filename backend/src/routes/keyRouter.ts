import express from "express";

export const keyRouter = express.Router();

keyRouter.get('/paypal', (req, res) => {
    res.json({ clientId: process.env.PAYPAL_CLIENT_ID || 'sb' });
});