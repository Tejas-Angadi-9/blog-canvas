import nodemailer from "nodemailer";

export const createTransporter = () => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
};

export const getMailOptions = (email, name, verificationLink) => {
    return {
        from: `BlogCanvas ${process.env.EMAIL}`,
        to: email,
        subject: "Welcome to BlogCanvas - Verify Your Email",
        text: "Account Verification",
        html: `
          <!DOCTYPE html>
          <html>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f9;">
            <div style="max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <div style="background-color: #4a90e2; color: #ffffff; text-align: center; padding: 20px;">
                <h1 style="margin: 0; font-size: 24px;">Welcome to <span style="font-weight: 300">Blog</span>Canvas!</h1>
              </div>
              
              <!-- Body -->
              <div style="padding: 20px;">
                <h2 style="margin-top: 0; color: #333333;">Verify Your Email Address</h2>
                <p style="color: #555555; font-size: 16px;">Hi ${name},</p>
                <p style="color: #555555; font-size: 16px;">Thank you for signing up for BlogCanvas! Please verify your email address to get started.</p>
                <a href="${verificationLink}" target="_blank" style="display: inline-block; margin-top: 20px; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #4a90e2; border-radius: 5px; text-decoration: none; font-weight: bold;">
                  Verify My Email
                </a>
                <p style="color: #555555; font-size: 16px; margin-top: 20px;">If you did not sign up for BlogCanvas, please ignore this email.</p>
              </div>
              
              <!-- Footer -->
              <div style="text-align: center; padding: 10px; background-color: #f4f4f9; color: #888888; font-size: 14px;">
                <p>&copy; ${new Date().getFullYear()} BlogCanvas.</p>
                <p>
                  <a href="http://localhost:3000/about" style="color: #4a90e2; text-decoration: none;">Contact Us</a>
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
    };
};
