import { Outlet as RouterOutlet } from "react-router";
import { Navigation } from "../modules/navigation/Navigation";
import { navigationConfig } from "../config/navigation";

export function Outlet() {
  return (
    <div>
      <Navigation {...navigationConfig} />
      <main className="container mx-auto mt-20 px-5">
        <RouterOutlet />
      </main>
    </div>
  );
}
