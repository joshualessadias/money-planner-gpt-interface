const formidable = require("formidable");
const {acceptedMimeTypes, acceptedAudioMimeTypes} = require("../../gemini/config/gemini.config");
const {sendFile} = require("../../gemini/services/chat/useCases/sendFile.useCase");
const {sendText} = require("../../gemini/services/chat/useCases/sendText.useCase");
const {sendAudio} = require("../../gemini/services/chat/useCases/sendAudio.useCase");

exports.sendMessage = async (req, res) => {
    const contentType = req.headers['content-type'];

    if (contentType === "application/json" && req.body.message) {
        res.send(await sendText(req.body.message));
        return;
    } else if (contentType !== "multipart/form-data") {
        const form = new formidable.IncomingForm();
        await form.parse(req, async (err, fields, files) => {
            if (err) {
                console.log("formParse error: ", err);
                res.status(500).send(err);
                return;
            }
            if (acceptedAudioMimeTypes.includes(files.file[0].mimetype)) {
                res.send(await sendAudio(files.file[0]));
                return;
            } else if (acceptedMimeTypes.includes(files.file[0].mimetype)) {
                res.send(await sendFile(files.file[0]));
                return;
            }
            res.status(500).send(`method not implemented for the file mimeType ${files.file[0].mimetype}`);
        });
        return;
    }
    res.status(400).send("Invalid request");
}