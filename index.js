const Express = require("express");
const cors = require("cors");
const path = require('path');
const app = Express();
const PORT = 80;

app.use(cors());
app.use(Express.static(path.join(__dirname, 'frontend')))

app.get("/api", (req, res) => {
    res.send({b: 'Mohan One', c: 6});
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
})

app.listen(PORT, () => {
    console.log("Server Started On Post", PORT)
})