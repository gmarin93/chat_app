// socketStore.tsx
import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { SocketState } from "@/types/socket";

export const useSocketStore = create<SocketState>()((set, get) => ({
  socket: null,
  isConnected: false,
  isConnecting: false,
  isDisconnected: false,
  isError: false,
  error: null,

  connect: () => {
    if (get().isConnected) return;

    const socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
    );
    set({ isConnecting: true });

    socket.on("connect", () =>
      set({ socket, isConnected: true, isConnecting: false }),
    );
    socket.on("disconnect", () =>
      set({ isConnected: false, isDisconnected: true }),
    );
    socket.on("connect_error", (err) =>
      set({ isError: true, error: err.message, isConnecting: false }),
    );

    set({ socket });
  },

  disconnect: () => {
    get().socket?.disconnect();
    set({ socket: null, isConnected: false });
  },
}));
