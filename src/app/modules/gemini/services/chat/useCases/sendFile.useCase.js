const {model, functions, contextDocMessage, fileManager} = require('../../gemini.service');

async function uploadFile(file) {
    console.log("Uploading file...");
    const uploadResult = await fileManager.uploadFile(file.filepath, {
        mimeType: file.mimetype,
        displayName: file.originalFilename
    });
    console.log(`File upload result: ${uploadResult.file.displayName}: ${uploadResult.file.uri}`);

    return uploadResult;
}

exports.sendFile = async (file) => {
    const uploadResult = await uploadFile(file);
    console.log(`Sending message... ${contextDocMessage}`);
    const result = await model.generateContent([contextDocMessage, {
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
