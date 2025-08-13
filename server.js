import 'dotenv/config';

import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import generateResponse from "./src/service/ai.service.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    console.log(msg);
  });

  socket.on("ai-message", async (data) => {
      console.log("Ai Prompt :", data.prompt);
    const response = await generateResponse(data.prompt);
    console.log("Ai response :", response);
    socket.emit("ai-message-response",response);
  });
});
httpServer.listen(3000, () => {
  console.log("server is running on port 3000");
});
