const http = require("http");
const { PORT } = require('./config/index');
const { app } = require('./utils/app');
const connectToDB = require("./utils/db");

connectToDB();
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
});

