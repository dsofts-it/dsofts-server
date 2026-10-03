import nodemailer from 'nodemailer';

async function sendTestEmail() {
  console.log('✉️ Testing Live Email dispatch to dsofts.itservices@gmail.com...');

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'dsofts.itservices@gmail.com',
      pass: 'unvtsoqtkqshpvsn'
    }
  });

  const mailOptions = {
    from: '"DSofts IT Services Website" <dsofts.itservices@gmail.com>',
    to: 'dsofts.itservices@gmail.com',
    subject: '🚀 Instant Email Test: Contact System Connected!',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; max-width: 600px;">
        <h2 style="color: #0284c7; margin-top: 0;">✅ Instant Email System Successfully Connected!</h2>
        <p>Your Gmail App Password (<strong>unvt soqt kqsh pvsn</strong>) is verified and working live.</p>
        <p>Whenever a client submits a project inquiry on your website, you will instantly receive an email alert in this inbox with full client details!</p>
        <hr style="border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #666;">DSofts IT Services Automated Notification Telemetry</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('🎉 SUCCESS! Verification email sent to dsofts.itservices@gmail.com:', info.messageId);
  } catch (err) {
    console.error('❌ Email dispatch failed:', err.message);
  }
}

sendTestEmail();
