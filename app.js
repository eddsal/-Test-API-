const express = require("express");
const {auth,checkJWT} = require("./middlew/Security")
const app = express();
app.use(express.json());

app.use("/products",checkJWT, require("./routes/Product"));
app.use("/users", require("./routes/User"));
app.use("/articles",checkJWT, require("./routes/Article"));
app.use("/login", auth);

module.exports = app;
