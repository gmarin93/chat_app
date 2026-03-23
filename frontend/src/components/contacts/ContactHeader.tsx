import SidebarHeader from "@/components/ui/Header";
import { useSidebarHeaderActions } from "@/hooks/useSidebarHeaderActions";
import { CONTACT_LIST_ACTIONS } from "@/config/sidebarActions";
import { useCallback } from "react";
import { SidebarHeaderAction } from "@/types/ui";
import { useView } from "@/contexts/ViewContext";

const ContactHeader = () => {
  const { currentView, setCurrentView } = useView();

  const handleActionClick = useCallback(
    (action: SidebarHeaderAction) => {
      if (action.label === "back") {
        setCurrentView(currentView === "contacts" ? "rooms" : "contacts");
      } else if (action.label === "add_contact") {
        // TODO: Add contact flow
        setCurrentView("contacts");
      }
    },
    [currentView, setCurrentView]
  );

  const actions = useSidebarHeaderActions(CONTACT_LIST_ACTIONS, handleActionClick);

  return (
    <SidebarHeader
      title="Contacts"
      avatar="👥"
      actions={actions}
    />
  );
};

export default ContactHeader;
