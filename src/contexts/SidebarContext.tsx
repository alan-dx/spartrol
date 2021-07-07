import { useState } from 'react'
import { createContext, Dispatch, ReactNode, SetStateAction } from 'react'

type SidebarContextData = {
  isOpen: boolean;
  toogleSideBar: () => void
}

interface SidebarContextProps {
  children: ReactNode
}

export const SidebarContext = createContext({} as SidebarContextData)

export function SidebarContextProvider({ children }: SidebarContextProps) {

  const [isOpen, setIsOpen] = useState(false)

  function toogleSideBar() {
    setIsOpen(isOpen => !isOpen)
  }

  return (
    <SidebarContext.Provider value={{isOpen, toogleSideBar}} >
      {children}
    </SidebarContext.Provider>
  )
}