import { useMemo } from "react";
import { SidebarHeaderAction } from "@/types/ui";

/**
 * Hook to create memoized sidebar header actions with onClick handlers.
 * Use this to share header action logic across RoomListHeader, ContactHeader, etc.
 *
 * @param actions - Base actions (icon + label)
 * @param onActionClick - Callback invoked when an action is clicked, receives the action
 * @returns Memoized actions with onClick handlers attached
 */
export const useSidebarHeaderActions = (
  actions: SidebarHeaderAction[],
  onActionClick: (action: SidebarHeaderAction) => void
): SidebarHeaderAction[] => {
  return useMemo(
    () =>
      actions.map((action) => ({
        ...action,
        onClick: () => onActionClick(action),
      })),
    [actions, onActionClick]
  );
};
