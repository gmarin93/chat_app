import { Socket } from "socket.io-client";

export interface SocketState {
    socket: Socket | null;
    isConnected: boolean;
    isConnecting: boolean;
    isDisconnected: boolean;
    isError: boolean;
    error: string | null;
    connect: () => void;
    disconnect: () => void;
}