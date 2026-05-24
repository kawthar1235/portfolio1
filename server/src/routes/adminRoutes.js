import { Router }                                     from 'express';
import { login, getMessages, deleteMessage, markRead } from '../controllers/adminController.js';
import auth from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login',               login);           // public
router.get('/messages',             auth, getMessages);
router.delete('/messages/:id',      auth, deleteMessage);
router.patch('/messages/:id/read',  auth, markRead);

export default router;
