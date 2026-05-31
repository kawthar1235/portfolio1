import Certificate from '../models/Certificate.js';

export const getAllCertificates = async (req, res, next) => {
  try {
    const certs = await Certificate.find().sort({ order: 1, createdAt: -1 });
    res.json(certs);
  } catch (err) { next(err); }
};

export const createCertificate = async (req, res, next) => {
  try {
    const cert = await Certificate.create(req.body);
    res.status(201).json(cert);
  } catch (err) { next(err); }
};

export const updateCertificate = async (req, res, next) => {
  try {
    const cert = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });
    res.json(cert);
  } catch (err) { next(err); }
};

export const deleteCertificate = async (req, res, next) => {
  try {
    const cert = await Certificate.findByIdAndDelete(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
