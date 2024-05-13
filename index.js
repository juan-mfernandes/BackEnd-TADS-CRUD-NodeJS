const express = require("express");
const server = express();
const { moviesRouter } = require('./routes/movies.js');
const { userRouter } = require('./routes/users.js');

server.use("/health", (req, res) => {
    res.send("Working!");
});

const port = 8080;
server.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
}); 
 
server.use(express.json());
server.use("/api", moviesRouter);
server.use("/api", userRouter);

module.exports = server;
