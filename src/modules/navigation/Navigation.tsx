import { NavigateFunction, useNavigate } from "react-router";

export interface NavigationProps {
  logoSrc?: string;
  items?: NavigationItem[];
}

export interface NavigationItem {
  id: string;
  name: string;
  navigate: (nav: NavigateFunction) => void;
}

export function Navigation({ logoSrc, items = [] }: NavigationProps) {
  const nav = useNavigate();
  const toHome = () => void nav("/");

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between bg-white p-4 shadow-md">
        <img
          onClick={toHome}
          src={logoSrc}
          alt="Logo"
          className="h-8 cursor-pointer"
        />
        <nav>
          <ul className="flex space-x-4">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => item.navigate(nav)}
                className="text-gray-700 hover:text-blue-500 cursor-pointer"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </nav>
  );
}
