import nodemailer from "nodemailer";
import User from "@/models/userModel";
import crypto from "crypto";

type EmailType = "VERIFY" | "FORGOT";

interface SendEmailParams {
  email: string;
  emailType: EmailType;
  userId: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailParams) => {
  try {
    // Find user
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Generate secure random token
    const token = crypto.randomBytes(32).toString("hex");

    // Hash token before storing it in database
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Token expires in 1 hour
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

    // Save token
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: tokenExpiry,
        },
        {
          new: true,
          runValidators: true,
        },
      );
    } else if (emailType === "FORGOT") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: tokenExpiry,
        },
        {
          new: true,
          runValidators: true,
        },
      );
    }

    // Check environment variables
    if (
      !process.env.MAILTRAP_HOST ||
      !process.env.MAILTRAP_PORT ||
      !process.env.MAILTRAP_USER ||
      !process.env.MAILTRAP_KEY
    ) {
      throw new Error("Mailtrap environment variables are not configured");
    }

    if (!process.env.DOMAIN) {
      throw new Error("DOMAIN is not configured");
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_KEY,
      },
    });

    // Determine URL
    const path = emailType === "VERIFY" ? "verify-email" : "reset-password";

    const url = `${process.env.DOMAIN}/${path}?token=${token}`;

    // Email content
    const actionText =
      emailType === "VERIFY"
        ? "verify your email address"
        : "reset your password";

    const buttonText =
      emailType === "VERIFY" ? "Verify Email" : "Reset Password";

    const subject =
      emailType === "VERIFY" ? "Verify your email" : "Reset your password";

    const mailOptions = {
      from: "hello@superezz.dev",
      to: email,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          
          <h2>
            ${
              emailType === "VERIFY"
                ? "Verify your email"
                : "Reset your password"
            }
          </h2>

          <p>
            Click the button below to ${actionText}.
          </p>

          <a
            href="${url}"
            style="
              display: inline-block;
              padding: 12px 20px;
              background: #000;
              color: #fff;
              text-decoration: none;
              border-radius: 6px;
            "
          >
            ${buttonText}
          </a>

          <p style="margin-top: 20px;">
            Or copy and paste this link into your browser:
          </p>

          <p style="word-break: break-all;">
            ${url}
          </p>

          <p>
            This link will expire in 1 hour.
          </p>

        </div>
      `,
    };

    // Send email
    const mailResponse = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", mailResponse.messageId);

    return mailResponse;
  } catch (error: unknown) {
    console.error("Error sending email:", error);

    throw new Error(
      error instanceof Error ? error.message : "Failed to send email",
    );
  }
};
