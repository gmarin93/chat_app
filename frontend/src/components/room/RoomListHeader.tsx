import SidebarHeader from "@/components/ui/Header";
import { useSidebarHeaderActions } from "@/hooks/useSidebarHeaderActions";
import { useView } from "@/contexts/ViewContext";
import { ROOM_LIST_ACTIONS } from "@/config/sidebarActions";
import { useCallback } from "react";
import { SidebarHeaderAction } from "@/types/ui";

const RoomListHeader = () => {
  const { setCurrentView } = useView();

  const handleActionClick = useCallback(
    (action: SidebarHeaderAction) => {
      setCurrentView(action.label.toLowerCase());
    },
    [setCurrentView]
  );

  const actions = useSidebarHeaderActions(ROOM_LIST_ACTIONS, handleActionClick);

  return (
    <SidebarHeader
      title="Rooms"
      avatar="💬"
      actions={actions}
    />
  );
};

export default RoomListHeader;
