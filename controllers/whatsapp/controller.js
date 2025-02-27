const axios = require("axios");

exports.SendTemplate = async (req, res) => {
  try {
    const { data, components, template_name, template_lang } = req.body;
    let sendData = [];

    for (let item of data) {
      const templateData = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: `91${item.phone}`,
        type: "template",
        template: {
          name: template_name,
          language: {
            code: template_lang,
          },
          "components": components
        },
      };

      const data = await axios.post(
        "https://graph.facebook.com/v21.0/575068729020861/messages",
        templateData,
        {
          headers: {
            Authorization: `Bearer ${process.env.whatsapp_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      if(data.statusText === 'OK'){
        sendData.push(data.data)
      }
    }

    return res.status(200).json({
      message:"Message send successful",
      sendData
    });

  } catch (error) {
    res.status(400).json({ message: `message sending error on ${item.phone} ` });
  }
};

exports.NavigateTowhatsapp = async (req, res) => {
  return res.redirect("https://wa.me/919205404076");
};
