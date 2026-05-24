import Project from '../models/Project.js';

// GET /api/projects
export const getAllProjects = async (req, res, next) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) { next(err); }
};

// GET /api/projects/:id
export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) { next(err); }
};

// POST /api/projects  (protected)
export const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) { next(err); }
};

// PUT /api/projects/:id  (protected)
export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) { next(err); }
};

// DELETE /api/projects/:id  (protected)
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) { next(err); }
};
