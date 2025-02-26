const axios = require("axios");

const Whatsapp_url =
  "https://graph.facebook.com/v21.0/575068729020861/messages";

exports.SendTemplate = async (req, res) => {
  const { data, components,template_name,template_lang } = req.body;
  for(let item of data) {
    try {

      const templateData = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": `91${item.phone}`,
        "type": "template",
        "template": {
            "name": template_name,
            "language": {
                "code": template_lang
            },
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": "text-string"
                        },  
                    ]
                }
            ]
        }
    }

    const data = axios.post("https://graph.facebook.com/v21.0/575068729020861/messages",templateData,{headers:{Authorization:`Bearer ${process.env.whatsapp_token}`,"Content-Type":"application/json"}})
    return res.status(200).json(data)
    } catch (error) {
      return res.status(400).json({message:`message sending error on ${item.phone} `})
    }
  }
  
};



exports.NavigateTowhatsapp = async (req, res) => {
  return res.redirect("https://wa.me/9205404076");
};
