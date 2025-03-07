import express from 'express';
import { createSeeds, deleteSeed, getAllSeeds, getSeedById, updateSeed } from '../controllers/seedsController';
import { authenticate, authenticateAdmin } from '../middleware/authMiddleware';


const router = express.Router();

router.post('/create', authenticate, authenticateAdmin, createSeeds);
router.get('/getSeeds', authenticate, getAllSeeds);
router.get('/getSeed/:seedId', authenticate, getSeedById);
router.put('/updateSeed/:seedId', authenticate, authenticateAdmin, updateSeed);
router.delete('/deleteSeed/:seedId', authenticate, authenticateAdmin, deleteSeed);

export default router;