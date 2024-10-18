const {model, functions, contextDocMessage, fileManager} = require('../gemini.service');

async function uploadPdf() {
    console.log("Uploading image...");
    const uploadResult = await fileManager.uploadFile("src/resources/fatura-itau.pdf", {
        mimeType: "application/pdf",
        displayName: "fatura-itau"
    });
    console.log(`Image upload result: ${uploadResult.file.displayName}: ${uploadResult.file.uri}`);

    return uploadResult;
}

exports.sendDoc = async (message) => {
    const uploadResult = await uploadPdf();
    message = contextDocMessage + message;
    console.log(`Sending message... ${message}`);
    const result = await model.generateContent([message, {
        fileData: {
            fileUri: uploadResult.file.uri,
            mimeType: uploadResult.file.mimeType
        }
    }]);
    console.log(result);
    const call = result.response.functionCalls() !== null ? result.response.functionCalls()[0] : null;

    if (call) {
        console.log(`Function call detected: ${call.name} with args: ${JSON.stringify(call.args)}`);
        return result.response.text();
        // return await functions[call.name](call.args);
    } else {
        console.log("No function call detected.");
        return result.response.text();
    }
}
