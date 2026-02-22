import { Outlet } from "react-router";
import { AppHeader } from "@/components/AppHeader";

export function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      <AppHeader />
      <main className="overflow-auto overscroll-contain">
        <Outlet />
      </main>
    </div>
  );
}
