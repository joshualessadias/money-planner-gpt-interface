const {GoogleGenerativeAI} = require("@google/generative-ai");
const {GoogleAIFileManager} = require("@google/generative-ai/server");
const outcomeService = require('../../core/services/outcome.services');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
exports.fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

exports.functions = {
    getOutcome: ({name, value, date, paymentMethod}) => outcomeService.getOutcome(name, value, date, paymentMethod),
}

exports.contextMessage = "Perform function requests for the user. The user wants to retrieve information about a " +
    "purchase that will be provided. Always try to get the total value of the purchase, because the user can send a " +
    "purchase with multiple items. ";

exports.model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", tools: [{functionDeclarations: [outcomeService.getOutcomeGeminiFunctionDeclaration]}]
});

