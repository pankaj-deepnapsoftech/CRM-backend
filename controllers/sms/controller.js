const request = require("request");
const websiteConfigurationModel = require("../../models/websiteConfiguration");

const sendBulkSms = async (req, res) => {
  try {
    const { mobiles, templateId, message } = req.body;

    const websiteConfiguration = await websiteConfigurationModel.findOne({organization: req.user.organization});
    const {sms_api_key, sms_api_secret, sms_sender_id:senderId, sms_entity_id:entityId} = websiteConfiguration;

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

    if (!mobiles || mobiles.length === 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Mobile no. not provided",
      });
    }

    // const mobile = mobiles.join(",");

    let options = {
      url: `${process.env.SEND_BULK_MSG_API}UserID=${sms_api_key}&Password=${sms_api_secret}&SenderID=${senderId}&Phno=${mobiles}&EntityID=${entityId}&TemplateID=${templateId}&Msg=${message}`,
      headers: { "content-type": "application/x-www-form-urlencoded" },
    };

    request.post(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "Message sent successfully",
        });
      } else {
        return res.status(500).json({
          status: 500,
          success: false,
          message: "Something went wrong",
        });
      }
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {sendBulkSms};