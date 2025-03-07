import express from 'express';
import { createFertilizer, deleteFertilizer, getAllFertilizers, getFertilizerById, updateFertilizer } from '../controllers/fertilizerController';
import { authenticate, authenticateAdmin } from '../middleware/authMiddleware';


const router = express.Router();

router.post('/create', authenticate, authenticateAdmin, createFertilizer);
router.get('/getFertilizers', authenticate, getAllFertilizers);
router.get('/getFertilizer/:fertilizerId', authenticate, getFertilizerById);
router.put('/updateFertilizer/:fertilizerId', authenticate, authenticateAdmin, updateFertilizer);
router.delete('/deleteFertilizer/:fertilizerId', authenticate, authenticateAdmin, deleteFertilizer);

export default router;
