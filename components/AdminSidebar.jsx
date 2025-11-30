"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PackageSearch,
  ShoppingCart,
  Users,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard /> },
    { name: "Products", path: "/admin/products", icon: <PackageSearch /> },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingCart /> },
    { name: "Users", path: "/admin/users", icon: <Users /> },
  ];

  return (
    <>
      {/* ⭐ Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white  text-white p-4 flex justify-between items-center z-30 shadow">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 bg-gray-700 rounded-lg"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ⭐ Sticky Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 
          h-screen
          bg-gray-900 text-white
          shadow-xl
          p-4
          z-40
          transition-all duration-300
          ${open ? "w-64" : "w-20"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8 mt-2 lg:mt-0">
          {open && <h2 className="text-2xl font-bold">Admin Panel</h2>}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600"
          >
            <Menu />
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 mb-8">
          <img
            src="https://i.pravatar.cc/100"
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          {open && (
            <div>
              <p className="font-semibold text-lg">Admin User</p>
              <p className="text-gray-300 text-sm">admin@example.com</p>
            </div>
          )}
        </div>

        {/* Menu */}
        <div className="space-y-2">
          {menu.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {open && <span>{item.name}</span>}
                </div>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* ⭐ MAIN CONTENT FIX (IMPORTANT) */}
      <div
        className="
          bg-white
          min-h-screen
          p-6
          pt-20 
          lg:pt-6
          transition-all duration-300
          lg:ml-64
        "
      >
        {/* Page content goes here */}
      </div>
    </>
  );
}
