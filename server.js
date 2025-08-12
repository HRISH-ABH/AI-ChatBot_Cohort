import httpServer from "./src/app.js"


httpServer.listen(3000, () => {
    console.log("server is running on port 3000");
});