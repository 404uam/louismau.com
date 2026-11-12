"use client";

import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useContext,
	useState,
} from "react";

const SidebarContext = createContext<{
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState(false);

	return (
		<SidebarContext.Provider value={{ open, setOpen }}>
			{children}
		</SidebarContext.Provider>
	);
}

export function useSidebar() {
	const value = useContext(SidebarContext);
	if (!value) throw new Error("Sidebar controls require SidebarProvider.");
	return value;
}
