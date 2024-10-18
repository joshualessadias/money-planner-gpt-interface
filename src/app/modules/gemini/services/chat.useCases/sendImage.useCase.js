const {model, functions, contextImageMessage, fileManager} = require('../gemini.service');

async function uploadImage() {
    console.log("Uploading image...");
    const uploadResult = await fileManager.uploadFile("src/resources/comprovante2.jpeg", {
        mimeType: "image/jpeg",
        displayName: "comprovante"
    });
    console.log(`Image upload result: ${uploadResult.file.displayName}: ${uploadResult.file.uri}`);

    return uploadResult;
}

exports.sendImage = async (body) => {
    const uploadResult = await uploadImage();
    console.log(`Sending message... ${contextImageMessage}`);
    const result = await model.generateContent([contextImageMessage, {
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
