import { Router } from 'express';
import { getAllCertificates, createCertificate, updateCertificate, deleteCertificate } from '../controllers/certificateController.js';
import auth from '../middleware/authMiddleware.js';

const router = Router();

router.get('/',        getAllCertificates);
router.post('/',       auth, createCertificate);
router.put('/:id',     auth, updateCertificate);
router.delete('/:id',  auth, deleteCertificate);

export default router;
