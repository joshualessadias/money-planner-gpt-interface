const {SchemaType} = require("@google/generative-ai/server");

exports.getOutcomeList = (outcomes) => {
    console.log(`Getting outcome list... ${outcomes}`);
    return outcomes.map(outcome => {
        return {
            description: outcome.name,
            value: outcome.value,
            date: outcome.date,
            paymentMethod: outcome.paymentMethod,
        }
    });
}

exports.getOutcomeListGeminiFunctionDeclaration = {
    name: "getOutcomeList",
    description: "Once the user provided a list of purchases, this function will return a list of objects containing the information of the user purchases.",
    parameters: {
        type: SchemaType.OBJECT,
        properties: {
            outcomes: {
                type: SchemaType.ARRAY,
                items: {
                    type: SchemaType.OBJECT,
                    properties: {
                        name: {
                            type: SchemaType.STRING,
                            description: "Brief name or description of the purchase. If the purchase has multiple items, it should consider the place where it was bought.",
                        },
                        value: {
                            type: SchemaType.NUMBER,
                            description: "Value of the purchase.",
                        },
                        date: {
                            type: SchemaType.STRING,
                            description: "Date when the purchase was made. It should be formatted as dd/mm/yyyy.",
                        },
                        paymentMethod: {
                            type: SchemaType.STRING,
                            description: "The type of payment used in the purchase. There are only four possible values: 'credit card', 'debit card', 'cash' or 'pix.",
                        },
                    },
                    required: ["name", "value", "date"],
                },
            },
        },
    },
};
