const gptService = require("../../gpt/services/chat.services.js");
const geminiService = require("../../gemini/services/chat.services.js");

exports.sendMessage = (req, res) => {
    res.send(geminiService.sendMessage(req.body));
}