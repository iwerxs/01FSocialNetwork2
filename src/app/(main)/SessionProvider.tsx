//src/app/(main)/SessionProvider.tsx
//context Session Provider for the {children} component
"use client";

import { Session, User } from "lucia";
import { createContext, useContext } from "react";

interface SessionContext {
  user: User;
  session: Session;
}

//create Context
const SessionContext = createContext<SessionContext | null>(null);

export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContext }>) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

//create a custom hook
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
