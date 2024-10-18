const OpenAIApi = require('openai');

exports.openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG
});