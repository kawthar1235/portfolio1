import { Router } from 'express';
import { login, getMessages, deleteMessage, markRead } from '../controllers/adminController.js';
import Admin from '../models/Admin.js';
import auth from '../middleware/authMiddleware.js';

const router = Router();

// TEMPORARY - delete after creating admin
router.get('/setup', async (req, res) => {
  const exists = await Admin.findOne({ username: 'kawthar' });
  if (exists) return res.json({ message: 'Admin already exists' });
  await Admin.create({ username: 'kawthar', password: 'Kawthar1234' });
  res.json({ message: 'Admin created! Now delete this route.' });
});

router.post('/login',              login);
router.get('/messages',            auth, getMessages);
router.delete('/messages/:id',     auth, deleteMessage);
router.patch('/messages/:id/read', auth, markRead);

export default router;
