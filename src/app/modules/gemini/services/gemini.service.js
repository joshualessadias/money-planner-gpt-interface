const {functions, fileManager} = require("../config/gemini.config");

exports.handleResult = async (result) => {
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

exports.uploadFile = async (file) => {
    console.log("Uploading file...");
    const uploadResult = await fileManager.uploadFile(file.filepath, {
        mimeType: file.mimetype,
        displayName: file.originalFilename
    });
    console.log(`Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`);

    return uploadResult;
}