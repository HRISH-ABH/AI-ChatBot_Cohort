import "dotenv/config";

import app from "./src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import generateResponse from "./src/service/ai.service.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});
const chatHistory = [];
io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    console.log(msg);
  });

  socket.on("ai-message", async (data) => {
    console.log("Ai Prompt :", data.prompt);

    chatHistory.push({
      role: "user",
      parts: [{ text: data.prompt }],
    });

    const response = await generateResponse(chatHistory);
    chatHistory.push({
        role: "model",
        parts: [{ text: response}],
    });
    for (let i = 0; i < chatHistory.length; i++) {
         console.log(chatHistory[i].parts[0].text);
       }
    console.log("Ai response :", response);
    socket.emit("ai-message-response", response);
  });
});
httpServer.listen(3000, () => {
  console.log("server is running on port 3000");
});
