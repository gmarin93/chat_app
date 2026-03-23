import { SidebarHeaderAction } from "@/types/ui";

const iconClass = "w-5 h-5";

export const SIDEBAR_ACTION_ICONS = {
  newChat: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={iconClass}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  contacts: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={iconClass}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="7" cy="7" r="3" />
      <circle cx="17" cy="7" r="3" />
      <path d="M2 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M17 14a4 4 0 0 1 4 4v2" />
    </svg>
  ),
  rooms: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={iconClass}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  back: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={iconClass}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  ),
};

/** Actions for the Rooms list header (new_chat, contacts, rooms, back) */
export const ROOM_LIST_ACTIONS: SidebarHeaderAction[] = [
  { label: "new_chat", icon: SIDEBAR_ACTION_ICONS.newChat },
  { label: "contacts", icon: SIDEBAR_ACTION_ICONS.contacts },
  { label: "rooms", icon: SIDEBAR_ACTION_ICONS.rooms },
  { label: "back", icon: SIDEBAR_ACTION_ICONS.back },
];

/** Actions for the Contacts list header */
export const CONTACT_LIST_ACTIONS: SidebarHeaderAction[] = [
  { label: "add_contact", icon: SIDEBAR_ACTION_ICONS.newChat },
  { label: "back", icon: SIDEBAR_ACTION_ICONS.back },
];
