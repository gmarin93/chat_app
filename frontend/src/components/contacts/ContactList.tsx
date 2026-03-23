"use client";

import { useEffect } from "react";
import { Room } from "@/types/room";
import SidebarList from "@/components/ui/SidebarList";
import SidebarListItem from "@/components/ui/SidebarListItem";
import ContactHeader from "./ContactHeader";
import { useStartDirectMessage } from "@/hooks/queries/useRoomsQuery";
import { useView } from "@/contexts/ViewContext";
import { useContactsQuery } from "@/hooks/queries/useContactQuery";

const roomTypeIcon = (type: Room["room_type"]) => {
  if (type === "direct") return "👤";
  if (type === "private") return "🔒";
  return "#";
};

const ContactList = () => {

  const { data: contacts = [], isLoading } = useContactsQuery();
  const { mutate: startDirectMessage } = useStartDirectMessage();
  const {setCurrentView} = useView();

  return (
    <SidebarList
      items={contacts}
      keyExtractor={(contact) => contact.id}
      filterKey={(contact) => contact.username}
      header={<ContactHeader />}
      searchPlaceholder="Search contacts"
      emptyMessage="No contacts yet"
      emptySearchMessage="No contacts match your search"
      renderItem={(contact) => (
        <SidebarListItem
          avatar={contact.avatar}
          title={contact.username}
          subtitle={contact.email}
          meta={"Online"}
          isActive={false}
          onClick={() => {
            startDirectMessage(contact.id);
            setCurrentView("rooms");
          }}
        />
      )}
    />
  );
};

export default ContactList;
