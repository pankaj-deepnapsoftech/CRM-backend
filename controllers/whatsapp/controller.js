const axios = require("axios");

const Whatsapp_url = "https://graph.facebook.com/v21.0/575068729020861/messages";

exports.SendTemplate = async (req, res) => {
    const { numbers, components } = req.body;
    const errors = [];

    for (let num of numbers) {
        const data = {
            "messaging_product": "whatsapp",
            "to": `91${num}`, 
            "type": "template",
            "template": {
                "name": "deepak_sir_testing",  
                "language": {
                    "code": "en"
                },
                "components": components
            }
        };

        try {
            await axios.post(Whatsapp_url, data, {
                headers: {
                    Authorization: `Bearer ${process.env.whatsapp_token}` // Ensure token is correctly set
                }
            });
        } catch (error) {
            errors.push({
                number: num,
                error: error.message || "Message sending failed"
            });
        }
    }

    // If no errors, return success message
    if (errors.length === 0) {
        return res.status(201).json({
            message: "All messages sent successfully"
        });
    }

    // If there are errors, return failure message with details
    return res.status(400).json({
        message: "Some messages failed to send",
        errors
    });
};
