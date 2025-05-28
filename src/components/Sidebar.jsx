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
  User,
  LogIn,
  Crown,
} from "lucide-react";

export function Sidebar() {
  const location = useLocation();
  const currentPath =
    location.pathname === "/" ? "/dashboard" : location.pathname;

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Header, label: "Header", path: "/header" },
    { icon: Layout, label: "Hero Section", path: "/hero-section" },
    { icon: Image, label: "Banner", path: "/banner" },
    { icon: Info, label: "About Us", path: "/about-us" },
    { icon: Package, label: "Product", path: "/product" },
    { icon: FileText, label: "Blogs", path: "/blogs" },
    { icon: Calculator, label: "Counting", path: "/counting" },
    { icon: Users, label: "Clients", path: "/clients" },
    { icon: Calendar, label: "Appointment", path: "/appointment" },
    { icon: Footer, label: "Footer", path: "/footer" },
  ];

  const profileItems = [
    { icon: User, label: "Profile", path: "/profile" },
    { icon: LogIn, label: "Sign In", path: "/signin" },
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
      <div className="flex-1 py-4">
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

        {/* Profile Section */}
        <div className="mt-8 px-3">
          <nav className="space-y-1">
            {profileItems.map((item, index) => {
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

      {/* Upgrade to PRO Card */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
              <Crown className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Upgrade to PRO</h3>
            <p className="text-sm text-white/90 mb-3 leading-relaxed">
              to get access to all features!
              <br />
              Connect with Venus World!
            </p>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
        </div>
      </div>
    </div>
  );
}
