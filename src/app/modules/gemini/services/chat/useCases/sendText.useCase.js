const {model, functions, contextDocMessage, fileManager} = require('../../gemini.service');

exports.sendText = async (message) => {
    message = contextDocMessage + message;
    console.log(`Sending message... ${message}`);
    const result = await model.generateContent(message);
    console.log(result.response.functionCalls());
    const calls = result.response.functionCalls();

    if (calls) {
        const firstCall = calls[0];
        console.log(`Function call detected: ${firstCall.name}`);
        return await functions[firstCall.name](firstCall.args);
    } else {
        console.log("No function call detected.");
        return result.response.text();
    }
}
