//src/app/(main)/messages/page.tsx
//page for Chat Client

import { Metadata } from "next";
import Chat from "./Chat";

export const metadata: Metadata = {
  title: "Messages",
};

export default function Page() {
  return <Chat />;
}
