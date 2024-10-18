const controller = require("../controllers/chat.controllers.js");
const router = require("express").Router();

module.exports = app => {
    router.post("/", controller.sendMessage);

    app.use('/api/chat', router);
};