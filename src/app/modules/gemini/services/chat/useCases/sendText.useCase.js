const {model, contextDocMessage} = require('../../../config/gemini.config');
const {handleResult} = require("../../gemini.service");

exports.sendText = async (message) => {
    message = contextDocMessage + message;
    console.log(`Sending text message...`);
    const result = await model.generateContent(message);
    return await handleResult(result);
}
