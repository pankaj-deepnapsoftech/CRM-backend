const request = require("request");

const sendSms = (apiKey, apiSecret, mobile, templateId, senderId, entityId, message) => {
  try {
    if (!templateId || templateId.trim().length === 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please provide the template id field",
      });
    }
    if (!senderId || senderId.trim().length === 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please provide the sender id field",
      });
    }
    if (!entityId || entityId.trim().length === 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please provide the entity id field",
      });
    }
    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please provide the message field",
      });
    }

    if (!mobile) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Mobile no. not provided",
      });
    }

    let options = {
      // url: `${process.env.SEND_SINGLE_MSG_API}UserID=${process.env.API_KEY}&Password=${process.env.API_SECRET}&SenderID=${senderId}&Phno=${req.body.mobile}&EntityID=${entityId}&TemplateID=${templateId}&Msg=${message}`,
      url: `${process.env.SEND_SINGLE_MSG_API}UserID=${apiKey}&Password=${apiSecret}&SenderID=${senderId}&Phno=${mobile}&EntityID=${entityId}&TemplateID=${templateId}&Msg=${message}`,
      headers: { "content-type": "application/x-www-form-urlencoded" },
    };

    request.post(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        return;
      } else {
        return;
      }
    });
  } catch (err) {
    throw err;
  }
};

module.exports = sendSms;