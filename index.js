const express = require("express");
const path = require("path");

const app = express();
const hostname = "127.0.0.1";

app.use((req, res, next) => {
    const { method, path } = req;
    console.log(
      `New request to: ${method} ${path} at ${new Date().toISOString()}`
    );
    next();
  });

app.get('/', (req, res)=>{
    res.send("Welcome on board");
    res.end("closed!");
})

const port = process.env.PORT || 8080;

app.listen(port, hostname, ()=>{
    console.log(`server listening at port ${port}`);
});