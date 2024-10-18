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
        type: "OBJECT",
        properties: {
            name: {
                type: "STRING",
                description: "Brief name or description of the purchase. If the purchase has multiple items, it should consider the place where it was bought.",
            },
            value: {
                type: "NUMBER",
                description: "Value of the purchase.",
            },
            date: {
                type: "STRING",
                description: "Date when the purchase was made. It should be formatted as pt-BR.",
            },
            paymentMethod: {
                type: "STRING",
                description: "The type of payment used in the purchase. There are only four possible values: 'credit card', 'debit card', 'cash' or 'pix.",
            },
        },
        required: ["name", "value", "date"],
    },
};