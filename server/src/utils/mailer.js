import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendContactEmail = async ({ name, email, subject, message }) => {
  await transporter.sendMail({
    from:    `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to:      process.env.EMAIL_TO,
    replyTo: email,
    subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px">
        <h2 style="color:#090087">New message from your portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || '—'}</p>
        <hr/>
        <p style="white-space:pre-wrap">${message}</p>
      </div>
    `,
  });
};
