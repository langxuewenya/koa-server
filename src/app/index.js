const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const registerRouteers = require("../router");

const app = new Koa();

app.use(bodyParser());

registerRouteers(app);

module.exports = app;
