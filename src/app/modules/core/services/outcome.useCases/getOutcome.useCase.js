const {SchemaType} = require("@google/generative-ai/server");

exports.getOutcome = (name, value, date, paymentMethod) => {
    return {
        description: name,
        value: value,
        date: date,
        paymentMethod: paymentMethod,
    }
}

exports.getOutcomeGeminiFunctionDeclaration = {
    name: "getOutcome",
    description: "Returns an object containing the information of the user purchase.",
    parameters: {
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
};