const express = require("express");
const app = express();
const port = 3000;

const currentTime = new Date();

const loggingMiddleware = (req, res, next) => {
    // console.log("Current time is:", currentTime)
    res.setHeader("X-Codaisseur-Time", currentTime)
    next();
}

const failRandomlyMiddleware = (req, res, next) => {
    const random = Math.random()*10
    // console.log(random)
    if (random < 5) {
        next()
    } else {
        res.status(500).send("")
    }
}

app.use(loggingMiddleware);

app.get("/", failRandomlyMiddleware, (req, res) => res.send("Hello"));

app.get("/foo", (req, res) => {
    res.send("Hi there!")
})

app.listen(port, () => console.log(`Server running on port ${port}!`));