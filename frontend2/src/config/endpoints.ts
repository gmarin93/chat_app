export const ACCOUNTS_ENDPOINTS = {
    LOGIN: '/accounts/token/',
    REGISTER: '/accounts/register/',
    LOGOUT: '/accounts/token/logout/',
    USER: '/accounts/user/',
    REFRESH: '/accounts/token/refresh/',
} as const;

export const ROOM_ENDPOINTS = {
    ROOMS: '/rooms/rooms/',
    ROOM_MEMBERSHIPS: '/rooms/room-memberships/',
    ROOM_DETAIL: '/rooms/rooms/:slug/',
    ROOM_MEMBERSHIP_DETAIL: '/rooms/room-memberships/:pk/',
} as const;

export const CHAT_ENDPOINTS = {
    MESSAGES: '/chats/messages/',
} as const;