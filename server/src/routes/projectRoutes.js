import { Router } from 'express';
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import auth from '../middleware/authMiddleware.js';

const router = Router();

router.get('/',     getAllProjects);
router.get('/:id',  getProjectById);
router.post('/',    auth, createProject);
router.put('/:id',  auth, updateProject);
router.delete('/:id', auth, deleteProject);

export default router;
