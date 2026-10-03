import nodemailer from 'nodemailer';

// Helper to send email notification for job applications to dsofts.itservices@gmail.com
const sendJobApplicationEmail = async (applicantData, job, file) => {
  const { fullName, email, phone, location, qualification, experienceYears, noticePeriod, skills, portfolioUrl } = applicantData;
  const recipient = 'dsofts.itservices@gmail.com';

  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = process.env.SMTP_PORT || 587;
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
  const rawPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const smtpPass = rawPass ? rawPass.replace(/\s+/g, '') : '';

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

      const attachments = file ? [
        {
          filename: file.originalname || 'Resume.pdf',
          path: file.path
        }
      ] : [];

      const mailOptions = {
        from: `"DSofts Careers Portal" <${smtpUser}>`,
        to: recipient,
        replyTo: email,
        subject: `💼 New Candidate Application: ${job.title} - ${fullName}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #0f172a; padding: 20px; text-align: center; color: #ffffff;">
              <h2 style="margin: 0; font-size: 20px;">DSofts Careers - New Candidate Application</h2>
              <p style="margin: 5px 0 0 0; color: #38bdf8; font-weight: bold;">Position: ${job.title}</p>
            </div>
            <div style="padding: 24px; background-color: #ffffff;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 150px;">Applicant Name:</td><td>${fullName}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email Address:</td><td><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Phone Number:</td><td>${phone || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Location:</td><td>${location || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Experience:</td><td><strong style="color: #0284c7;">${experienceYears || 'Fresher'}</strong></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Notice Period:</td><td><strong style="color: #eab308;">${noticePeriod || 'NA'}</strong></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Qualification:</td><td>${qualification || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Portfolio / Site:</td><td>${portfolioUrl ? `<a href="${portfolioUrl}" target="_blank">${portfolioUrl}</a>` : 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Skills:</td><td>${Array.isArray(skills) ? skills.join(', ') : (skills || 'N/A')}</td></tr>
              </table>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              <p style="font-size: 13px; color: #475569;">📎 Candidate resume document is attached to this email and saved in your Admin Panel.</p>
            </div>
            <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 12px; color: #64748b;">
              Sent automatically from DSofts IT Services Careers Portal
            </div>
          </div>
        `,
        attachments
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Candidate job application email successfully sent to ${recipient}`);
    } catch (err) {
      console.error(`⚠️ Job application email dispatch error: ${err.message}`);
    }
  }
};

// Public: Submit Job Application
export const submitApplication = async (req, res, next) => {
  try {
    const { jobId, fullName, email, phone, location, qualification, experienceYears, currentSalary, expectedSalary, noticePeriod, skills, linkedinUrl, githubUrl, portfolioUrl, coverLetter } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Resume document (PDF/DOC/DOCX) is required' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'The specified job opening was not found' });
    }

    // Default noticePeriod to NA for Freshers
    const finalNoticePeriod = (experienceYears?.toLowerCase().includes('fresher') || experienceYears === '0' || !noticePeriod) ? 'NA' : noticePeriod;

    const application = await JobApplication.create({
      jobId: job._id,
      jobTitle: job.title,
      fullName,
      email,
      phone,
      location: location || '',
      qualification: qualification || '',
      experienceYears: experienceYears || 'Fresher',
      currentSalary: currentSalary || '',
      expectedSalary: expectedSalary || '',
      noticePeriod: finalNoticePeriod,
      skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : []),
      linkedinUrl: linkedinUrl || '',
      githubUrl: githubUrl || '',
      portfolioUrl: portfolioUrl || '',
      coverLetter: coverLetter || '',
      resumePath: req.file.path,
      originalFileName: req.file.originalname,
      status: 'New'
    });

    // Send email notification asynchronously
    sendJobApplicationEmail(
      { fullName, email, phone, location, qualification, experienceYears, noticePeriod: finalNoticePeriod, skills, portfolioUrl },
      job,
      req.file
    ).catch(err => console.error('Job application email error:', err));

    res.status(201).json({
      message: 'Application submitted successfully. Our hiring team will review your profile and get in touch!',
      applicationId: application._id
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all applications
export const getApplicationsAdmin = async (req, res, next) => {
  try {
    const { jobId, status } = req.query;
    const filter = {};
    if (jobId) filter.jobId = jobId;
    if (status) filter.status = status;

    const applications = await JobApplication.find(filter).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

// Admin: Get single application details
export const getApplicationByIdAdmin = async (req, res, next) => {
  try {
    const application = await JobApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    next(error);
  }
};

// Admin: Update status / notes
export const updateApplicationAdmin = async (req, res, next) => {
  try {
    const { status, internalNotes } = req.body;
    const application = await JobApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (status) application.status = status;
    if (internalNotes !== undefined) application.internalNotes = internalNotes;

    await application.save();
    res.json(application);
  } catch (error) {
    next(error);
  }
};

// Admin: Securely download candidate resume
export const downloadResumeAdmin = async (req, res, next) => {
  try {
    const application = await JobApplication.findById(req.params.id);
    if (!application || !application.resumePath) {
      return res.status(404).json({ message: 'Resume file not found' });
    }

    if (!fs.existsSync(application.resumePath)) {
      return res.status(404).json({ message: 'File missing from server storage' });
    }

    res.download(application.resumePath, application.originalFileName || 'Resume.pdf');
  } catch (error) {
    next(error);
  }
};

// Admin: Delete application
export const deleteApplicationAdmin = async (req, res, next) => {
  try {
    const application = await JobApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Delete file if exists
    if (application.resumePath && fs.existsSync(application.resumePath)) {
      fs.unlinkSync(application.resumePath);
    }

    await JobApplication.findByIdAndDelete(req.params.id);
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    next(error);
  }
};
