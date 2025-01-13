import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import ProgressBar from "./progress-bar";

const navItems = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "blog",
  },
  "/project": {
    name: "project",
  },
  "https://github.com/dyeon-dev": {
    name: "github",
  },
};

export function Navbar() {
  return (
    <aside className="fixed top-0 left-0 w-full z-50">
      <div
        className="flex justify-between items-center px-20 bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(0,0,0,0.1)] backdrop-blur-md shadow-sm"
        style={{ height: "60px" }}
      >
        <nav className="flex flex-row items-center" id="nav">
          <div className="flex flex-row space-x-4">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 py-1 px-2"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
        <ThemeSwitcher />
      </div>

      <ProgressBar />
    </aside>
  );
}
