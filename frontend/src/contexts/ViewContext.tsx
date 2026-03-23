"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface ViewContextValue {
  currentView: string;
  setCurrentView: (view: string) => void;
}

const ViewContext = createContext<ViewContextValue | null>(null);

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [currentView, setCurrentViewState] = useState<string>("rooms");

  const setCurrentView = useCallback((view: string) => {
    setCurrentViewState(view);
  }, []);

  return (
    <ViewContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useView must be used within a ViewProvider");
  }
  return context;
};
