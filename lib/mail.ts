import { getUserByEmail } from '@/data/user';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
) => {
    const user = await getUserByEmail(email)
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: '2FA confiramation',
        html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <title>Two-Factor Authentication Confirmation</title>
                </head>
                <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
                  <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ccc;">
                    <h2 style="text-align: center;">Two-Factor Authentication Confirmation</h2>
                    <p>Dear ${user?.name},</p>
                    <p>You have recently requested to enable Two-Factor Authentication (2FA) for your account on Auth Next. To complete this process, please use the following code:</p>
                    <p style="text-align: center; font-size: 24px; font-weight: bold;">Verification Code: ${token}</p>
                    <p>Please enter this code within the specified timeframe to enable 2FA and enhance the security of your account. If you didn't initiate this request, please ignore this email.</p>
                    <p>Thank you for using Auth Next.</p>
                    <p>Best regards,<br>Auth Next</p>
                  </div>
                </body>
                </html>
                `,
    });
};

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const user = await getUserByEmail(email);
    const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Confirm Your Email',
        html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <title>Email Confirmation</title>
                </head>
                <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
                  <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ccc;">
                    <h2 style="text-align: center;">Email Confirmation</h2>
                    <p>Dear ${user?.name},</p>
                    <p>Thank you for signing up with us. To verify your email address and activate your account, please click on the button below:</p>
                    <p style="text-align: center;"><a href="${confirmationLink}" style="text-decoration: none; display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; border-radius: 5px;">Verify Email Address</a></p>
                    <p>If you didn't create an account with us, please disregard this email.</p>
                    <p>Thank you,<br>Auth Next</p>
                  </div>
                </body>
                </html>
              `,
    });
};




export const sendPasswordRestEmail = async (
    email: string,
    token: string
) => {
    const confirmationLink = `http://localhost:3000/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Reset your password',
        html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <title>Password Reset</title>
                </head>
                <body style="font-family: Arial, sans-serif;">

                  <h2>Password Reset</h2>

                  <p>Hello,</p>

                  <p>You recently requested to reset your password. Please click the link below to reset your password:</p>

                  <p><a href="${confirmationLink}">Reset Your Password</a></p>

                  <p>If you did not request a password reset, you can ignore this email. Your password will remain unchanged.</p>

                  <p>Thank you,</p>
                  <p>Your Application Team</p>

                </body>
                </html>
                `,
    });
};
