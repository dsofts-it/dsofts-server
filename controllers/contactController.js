import nodemailer from 'nodemailer';
import ContactMessage from '../models/ContactMessage.js';

// Send email notification to dsofts.itservices@gmail.com
const sendEmailNotification = async (inquiryData) => {
  const { name, email, phone, company, service, budget, timeline, message } = inquiryData;
  const recipient = 'dsofts.itservices@gmail.com';

  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = process.env.SMTP_PORT || 587;
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort),
        secure: Number(smtpPort) === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const mailOptions = {
        from: `"DSofts IT Services Website" <${smtpUser}>`,
        to: recipient,
        replyTo: email,
        subject: `🚀 New Project Request: ${service || 'General Inquiry'} - ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #0f172a; padding: 20px; text-align: center; color: #ffffff;">
              <h2 style="margin: 0; font-size: 20px;">DSofts IT Services - New Project Request</h2>
            </div>
            <div style="padding: 24px; background-color: #ffffff;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Client Name:</td><td>${name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Client Email:</td><td><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Phone Number:</td><td>${phone || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Company:</td><td>${company || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Service Required:</td><td><strong style="color: #0284c7;">${service || 'General Inquiry'}</strong></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Budget (₹):</td><td><strong style="color: #16a34a;">${budget || 'Not specified'}</strong></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Timeline:</td><td>${timeline || 'Not specified'}</td></tr>
              </table>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              <h3 style="margin-top: 0; color: #0f172a;">Project Details:</h3>
              <p style="background-color: #f8fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #0284c7; white-space: pre-wrap;">${message}</p>
            </div>
            <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 12px; color: #64748b;">
              Sent automatically from DSofts IT Services Contact Portal
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Email notification successfully sent to ${recipient}`);
    } catch (err) {
      console.error(`⚠️ Email dispatch error (saved in DB): ${err.message}`);
    }
  } else {
    console.log(`ℹ️ Inquiry saved to DB & targeted for ${recipient} (Configure SMTP_USER/SMTP_PASS in .env to dispatch live emails)`);
  }
};

// @desc    Create new contact message
// @route   POST /api/contact
// @access  Public
export const createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, company, service, budget, timeline, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Please provide name, email, and project message' 
      });
    }

    const contactMessage = await ContactMessage.create({
      name,
      email,
      phone,
      company,
      service,
      budget,
      timeline,
      message,
      targetEmail: 'dsofts.itservices@gmail.com'
    });

    // Send email notification asynchronously
    sendEmailNotification({ name, email, phone, company, service, budget, timeline, message }).catch(err => {
      console.error('Asynchronous email error:', err);
    });

    res.status(201).json({
      message: 'Contact message sent successfully',
      data: contactMessage
    });
  } catch (error) {
    console.error('Create contact message error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get all contact messages (Admin only)
// @route   GET /api/admin/contact
// @access  Private/Admin
export const getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Get all contact messages error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get single contact message (Admin only)
// @route   GET /api/admin/contact/:id
// @access  Private/Admin
export const getContactMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await ContactMessage.findById(id);

    if (!message) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.status(200).json(message);
  } catch (error) {
    console.error('Get contact message error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Delete contact message (Admin only)
// @route   DELETE /api/admin/contact/:id
// @access  Private/Admin
export const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await ContactMessage.findById(id);

    if (!message) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    await ContactMessage.findByIdAndDelete(id);

    res.status(200).json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    console.error('Delete contact message error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
