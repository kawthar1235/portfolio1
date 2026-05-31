import { Router } from 'express';
import auth from '../middleware/authMiddleware.js';
import {
  getCertificates,
  addCertificate,
  updateCertificate,
  deleteCertificate,
} from '../controllers/certificateController.js';

const router = Router();

router.get('/', getCertificates);
router.post('/', auth, addCertificate);
router.put('/:id', auth, updateCertificate);
router.delete('/:id', auth, deleteCertificate);

export default router;
