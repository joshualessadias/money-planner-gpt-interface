const {GoogleGenerativeAI} = require("@google/generative-ai");
const {GoogleAIFileManager} = require("@google/generative-ai/server");
const getOutcomeService = require('../../core/services/outcome.useCases/getOutcome.useCase');
const getOutcomeListService = require("../../core/services/outcome.useCases/getOutcomeList.useCase");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
exports.fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

exports.functions = {
    getOutcome: ({name, value, date, paymentMethod}) => getOutcomeService.getOutcome(name, value, date, paymentMethod),
    getOutcomeList: ({outcomes}) => getOutcomeListService.getOutcomeList(outcomes)
}

exports.contextImageMessage = "Context: Perform function requests for the user. The user wants to retrieve information about a purchase that will be provided. Always try to get the total value of the purchase, because the user can send a purchase with multiple items.\n\n";

exports.contextDocMessage = "Context: Perform function requests for the user. The user wants to retrieve information about a purchase that will be provided. Always try to get the total value of the purchase, because the user can send a purchase with multiple items.\n\n";

exports.model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", tools: [{
        functionDeclarations: [getOutcomeService.getOutcomeGeminiFunctionDeclaration, getOutcomeListService.getOutcomeListGeminiFunctionDeclaration]
    }]
});

