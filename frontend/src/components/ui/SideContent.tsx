"use client";

import RoomList from "../room/RoomList";
import ContactList from "../contacts/ContactList";
import { useView } from "@/contexts/ViewContext";
import SidebarSkeleton from "./SidebarSkeleton";
import { Suspense } from "react";

const SideContent = () => {
  const { currentView } = useView();

  return (
    <div className="flex flex-col h-full bg-[#111b21]">
      <Suspense fallback={<SidebarSkeleton />}>
        {currentView === "rooms" ? <RoomList /> : <ContactList />}
      </Suspense>
    </div>
  );
};

export default SideContent;
