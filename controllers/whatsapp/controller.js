const axios = require("axios");

const Whatsapp_url = "https://graph.facebook.com/v21.0/575068729020861/messages";

exports.SendTemplate = async (req, res) => {
    const { numbers, components } = req.body;

    // Array to hold promises for all the requests
    const promises = [];

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

        // Push the axios request promise to the promises array
        promises.push(axios.post(Whatsapp_url, data, {
            headers: {
                Authorization: `Bearer ${process.env.whatsapp_token}` // Make sure the token is correctly set
            }
        }));
    }

    try {
        // Wait for all the requests to finish
        await Promise.all(promises);

        // Return response after all messages are sent
        return res.status(201).json({
            message: "Messages sent"
        });
    } catch (error) {
        // If any of the requests fail, handle the error
        return res.status(400).json({
            message: "Message sending error",
            error: error.message // Provide the error message for better debugging
        });
    }
};


exports.CallbackUrl =  async (req, res) => {
    // log incoming messages
    console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));
  
    // check if the webhook request contains a message
    // details on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
    const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];
  
    // check if the incoming message contains text
    if (message?.type === "text") {
      // extract the business number to send the reply from it
      const business_phone_number_id =
        req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;
  
      // send a reply message as per the docs here https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages
      await axios({
        method: "POST",
        url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          to: message.from,
          text: { body: "Echo: " + message.text.body },
          context: {
            message_id: message.id, // shows the message as a reply to the original user message
          },
        },
      });
  
      // mark incoming message as read
      await axios({
        method: "POST",
        url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          status: "read",
          message_id: message.id,
        },
      });
    }
  
    res.sendStatus(200);
  };