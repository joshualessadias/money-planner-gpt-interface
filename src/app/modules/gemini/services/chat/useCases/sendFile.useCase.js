const {model, contextDocMessage} = require('../../../config/gemini.config');
const {handleResult, uploadFile} = require("../../gemini.service");

exports.sendFile = async (file) => {
    const uploadResult = await uploadFile(file);
    console.log(`Sending file message...`);
    const result = await model.generateContent([contextDocMessage, {
        fileData: {
            fileUri: uploadResult.file.uri,
            mimeType: uploadResult.file.mimeType
        }
    }]);
    return await handleResult(result);
}
