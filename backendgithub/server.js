const express = require("express");
const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");

dotenv.config();

const app = express();
const PORT = 3000;

// Set SendGrid API key from .env
//sgMail.setApikey used to configure the sendgrid mail and authenqticate the API key for sending emails.
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



// Middleware to read JSON data
app.use(express.json());

// Serve frontend files
app.use(express.static(__dirname));

// Store subscribers temporarily
const subscribers = [];

// Subscribe endpoint
app.post("/subscribe", async (req, res) => {

    const { email } = req.body;

    // Check if email was provided
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email address is required."
        });
    }

    // Basic email validation
    if (!email.includes("@")) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email address."
        });
    }

    // Check for duplicate subscriber
    if (subscribers.includes(email)) {
        return res.status(409).json({
            success: false,
            message: "This email is already subscribed."
        });
    }

    // Add email to mailing list
    subscribers.push(email);

    // Create email message
    const message = {
        to: email,
        from: process.env.FROM_EMAIL,
        subject: "Welcome to DEV@Deakin Daily Insider!",
        text: "Thank you for subscribing to our daily insider newsletter!",
        html: `
            <h2>Welcome to DEV@Deakin!</h2>
            <p>Thank you for subscribing to our Daily Insider newsletter.</p>
            <p>You have successfully joined our mailing list.</p>
        `
    };

    try {
        // Send email asynchronously
        const response = await sgMail.send(message);

        console.log("Email sent to:", email);
        console.log("SendGrid Status Code:", response[0].statusCode);

        return res.status(201).json({
            success: true,
            message: "Successfully subscribed! Please check your email."
        });

    } catch (error) {

        console.error("Email sending error:", error);

        // Remove email if sending failed
        const index = subscribers.indexOf(email);

        if (index !== -1) {
            subscribers.splice(index, 1);
        }

        return res.status(500).json({
            success: false,
            message: "Subscription failed. Please try again later."
        });
    }

}); // End of /subscribe route


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});