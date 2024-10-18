const {sendMessage} = require("../../gemini/services/chat.useCases/sendMessage.services");


exports.sendMessage = async (req, res) => {
    res.send(await sendMessage(req.body));
}