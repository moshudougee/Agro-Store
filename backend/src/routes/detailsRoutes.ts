import express from 'express';
import { authenticate, authenticateAdmin } from '../middleware/authMiddleware';
import { addDetails, deleteDetails, getDetails, getDetailsById, updateDetails } from '../controllers/detailsController';


const router = express.Router();

router.post('/add', authenticate, addDetails);
router.get('/getDetails', authenticate, getDetails);
router.get('/getDetailsById/:detailsId', authenticate, authenticateAdmin, getDetailsById);
router.put('/updateDetails', authenticate, updateDetails);
router.delete('/deleteDetails', authenticate, deleteDetails);

export default router;