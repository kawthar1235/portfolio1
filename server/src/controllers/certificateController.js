import Certificate from '../models/Certificate.js';

export const getCertificates = async (req, res, next) => {
  try {
    const certificates = await Certificate.find().sort({ featured: -1, createdAt: -1 });
    res.json(certificates);
  } catch (err) {
    next(err);
  }
};

export const addCertificate = async (req, res, next) => {
  try {
    const { title, titleAr, issuer, issuerAr, year, image, link, featured } = req.body;

    if (!title || !issuer || !year || !image) {
      return res.status(400).json({ message: 'Title, issuer, year, and image are required' });
    }

    const certificate = await Certificate.create({
      title,
      titleAr,
      issuer,
      issuerAr,
      year,
      image,
      link,
      featured: !!featured,
    });

    res.status(201).json(certificate);
  } catch (err) {
    next(err);
  }
};

export const updateCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.json(certificate);
  } catch (err) {
    next(err);
  }
};

export const deleteCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};
