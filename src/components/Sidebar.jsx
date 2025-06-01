import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  HeadingIcon as Header,
  Layout,
  ImageIcon as Image,
  Info,
  Package,
  FileText,
  Calculator,
  Users,
  Calendar,
  FootprintsIcon as Footer,
  HandCoins,
} from "lucide-react";

export function Sidebar() {
  const location = useLocation();
  const currentPath =
    location.pathname === "/" ? "/dashboard" : location.pathname;

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Header, label: "Header", path: "/header" },

    { icon: Image, label: "Banner", path: "/banner" },
    { icon: Info, label: "About Us", path: "/about-us" },
    { icon: Package, label: "Product", path: "/product" },
    { icon: FileText, label: "Blogs", path: "/blogs" },

    { icon: Users, label: "Clients", path: "/clients" },
    { icon: HandCoins, label: "Offers", path: "/offers" },
    { icon: Calendar, label: "Appointment", path: "/appointment" },
    { icon: Footer, label: "Footer", path: "/footer" },
  ];

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="py-9 px-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900">
          <span className="text-blue-600">LZY</span> CRAZY
        </h1>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
