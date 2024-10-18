const geminiService = require('./gemini.services');
const outcomeService = require('../../core/services/outcome.services');

function getOutcome(name, value, date) {
    return outcomeService.getOutcome(name, value, date);
}

async function getGenerateContentResultPromise(message) {
    return await geminiService.model.generateContent(message);
}

exports.sendMessage = (body) => {
    getGenerateContentResultPromise(body.message).then((result) => {
        console.log(result.response.text());
    });
}
