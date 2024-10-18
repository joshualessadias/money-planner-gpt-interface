const gptService = require("../../gpt/services/chat.services.js");
const geminiService = require("../../gemini/services/chat.services.js");

exports.sendMessage = async (req, res) => {
    res.send(await geminiService.sendMessage(req.body.message));
}