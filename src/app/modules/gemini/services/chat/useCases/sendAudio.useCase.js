const {model, contextDocMessage, fileManager} = require('../../../config/gemini.config');
const {handleResult, uploadFile} = require("../../gemini.service");
const {FileState} = require("@google/generative-ai/server");

async function checkAudioProcessing(uploadResult) {
    console.log(`Processing audio file...`);
    let file = await fileManager.getFile(uploadResult.file.name);
    while (file.state === FileState.PROCESSING) {
        process.stdout.write(".");
        await new Promise((resolve) => setTimeout(resolve, 1_000));
        file = await fileManager.getFile(uploadResult.file.name);
    }

    if (file.state === FileState.FAILED) {
        throw new Error("Audio processing failed.");
    }

    console.log(`Audio file processed with success.`);
}

exports.sendAudio = async (audio) => {
    const uploadResult = await uploadFile(audio);
    await checkAudioProcessing(uploadResult);
    console.log(`Sending file message...`);
    const result = await model.generateContent([contextDocMessage, {
        fileData: {
            fileUri: uploadResult.file.uri,
            mimeType: uploadResult.file.mimeType
        }
    }]);
    return await handleResult(result);
}
