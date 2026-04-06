import { createContext, useContext, useState, ReactNode } from 'react';

interface SideBarContextData {
  isOpen: boolean;
  toggleSideBar: () => void;
  openSideBar: () => void;
  closeSideBar: () => void;
}

const SideBarContext = createContext<SideBarContextData>({} as SideBarContextData);

interface SideBarProviderProps {
  children: ReactNode;
}

export function SideBarProvider({ children }: SideBarProviderProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSideBar = () => setIsOpen(prev => !prev);
  const openSideBar = () => setIsOpen(true);
  const closeSideBar = () => setIsOpen(false);

  return (
    <SideBarContext.Provider
      value={{
        isOpen,
        toggleSideBar,
        openSideBar,
        closeSideBar,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
}

export const useSideBar = () => {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error('useSideBar must be used within SideBarProvider');
  }
  return context;
};
