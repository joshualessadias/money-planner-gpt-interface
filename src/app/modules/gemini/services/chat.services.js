const geminiService = require('./gemini.services');
const outcomeService = require('../../core/services/outcome.services');

function getOutcome(name, value, date) {
    return outcomeService.getOutcome(name, value, date);
}

exports.sendMessage = (body) => {
    return geminiService.model.generateContent(body.message);
}
