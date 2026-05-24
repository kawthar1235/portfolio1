import Message            from '../models/Message.js';
import { sendContactEmail } from '../utils/mailer.js';

// POST /api/contact
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }

    // Save to DB
    await Message.create({ name, email, subject, message });

    // Send email notification (non-blocking — don't fail if email fails)
    sendContactEmail({ name, email, subject, message }).catch(console.error);

    res.status(201).json({ message: 'Message received! I\'ll be in touch soon.' });
  } catch (err) { next(err); }
};
