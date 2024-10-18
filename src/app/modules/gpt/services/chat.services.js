const openaiService = require('./openai.services');
const outcome = require('../../core/services/outcome.services');

function getOutcome(name, value, date) {
    return outcome.getOutcome(name, value, date);
}

async function callChatGptWithFunctions(userMessage) {
    let chat = await openaiService.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "Perform function requests for the user. The user wants to retrieve information about a purchase that will be provided."
            },
            {role: "user", content: userMessage}
        ],
        functions: [{
            name: "getOutcome",
            description: "Get a sentence describing a purchase.",
            parameters: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: "The name of the item purchased."
                    },
                    value: {
                        type: "number",
                        description: "The value of the item purchased."
                    },
                    date: {
                        type: "string",
                        description: "The date of the purchase."
                    }
                },
                required: ["name", "value", "date"]
            }
        }],
        function_call: "auto"
    });

    let finishReason = chat.choices[0].finish_reason;
    console.log(finishReason);
    let wantsToUseFunction = finishReason === "function_call";
    if (wantsToUseFunction) return "Gpt wants to call the function.";
    else return "Gpt DO NOT wants to call the function.";
}

exports.sendMessage = (body) => {
    return callChatGptWithFunctions(body.message);
}
