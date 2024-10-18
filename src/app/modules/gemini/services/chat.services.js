const {model, functions, contextMessage, fileManager} = require('./gemini.services');

async function uploadImage() {
    console.log("Uploading image...");
    const uploadResult = await fileManager.uploadFile("comprovante.jpeg", {
        mimeType: "image/jpeg",
        displayName: "comprovante"
    });
    console.log(`Image upload result: ${uploadResult.file.displayName}: ${uploadResult.file.uri}`);

    return uploadResult;
}

exports.sendMessage = async (message) => {
    const uploadResult = await uploadImage();
    message = contextMessage + message;
    console.log(`Sending message... ${message}`);
    const result = await model.generateContent([message, {
        fileData: {
            fileUri: uploadResult.file.uri,
            mimeType: uploadResult.file.mimeType
        }
    }]);
    const call = result.response.functionCalls()[0];

    if (call) {
        console.log(`Function call detected: ${call.name}`);
        return await functions[call.name](call.args);
    } else {
        console.log("No function call detected.");
        return result.response.text();
    }
}
