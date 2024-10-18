const service = require("../../gpt/services/chat.services.js");

exports.sendMessage = (req, res) => {
    res.send(service.sendMessage(req.body));
}