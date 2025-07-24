import type { NextApiRequest, NextApiResponse } from "next";
import { Server as IOServer, Socket as IOSocket } from "socket.io";
import type { Server as HTTPServer } from "http";

type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: HTTPServer & {
      io?: IOServer;
    };
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  const server = res.socket.server;

  if (!server.io) {
    console.log("🔌 Initializing Socket.IO");

    const io = new IOServer(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    server.io = io;

    io.on("connection", (socket: IOSocket) => {
      console.log(`➕ Socket connected: ${socket.id}`);

      socket.on("join-room", (roomId: string) => {
        socket.join(roomId);
      });

      socket.on("code-change", (payload: { roomId: string; code: string }) => {
        const { roomId, code } = payload;
        socket.broadcast.to(roomId).emit("code-change", code);
      });

      socket.on("disconnect", () => {
        console.log(`➖ Socket disconnected: ${socket.id}`);
      });
    });
  }

  res.end();
}
