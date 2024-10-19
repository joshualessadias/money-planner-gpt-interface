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

exports.contextDocMessage = `Context: Your are a chat bot that performs function requests. The user wants to retrieve information about a purchase that will be provided. Always try to get the total value of the purchase, because the user can send a purchase with multiple items.
Important: Consider that today's date is ${new Date().toDateString()}.
Important: Do not try to find out the payment type, if the user did not provided it.
Important: If the user do not provide the required information, ask they back for it.
Important: provide information in the language of the user input that's bellow.

`;

exports.model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", tools: [{
        functionDeclarations: [getOutcomeService.getOutcomeGeminiFunctionDeclaration, getOutcomeListService.getOutcomeListGeminiFunctionDeclaration]
    }]
});

const acceptedImageMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/heic",
    "image/heif"
];

const acceptedDocMimeTypes = [
    "application/pdf"
];

const acceptedAudioMimeTypes = [
    "audio/wav",
    "audio/mp3",
    "audio/aiff",
    "audio/aac",
    "audio/ogg",
    "audio/flac",
];
exports.acceptedAudioMimeTypes = acceptedAudioMimeTypes;

exports.acceptedMimeTypes = [...acceptedImageMimeTypes, ...acceptedDocMimeTypes, ...acceptedAudioMimeTypes];