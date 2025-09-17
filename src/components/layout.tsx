// src/components/layout.tsx
import { Outlet, Link } from 'react-router-dom';
import { Waves, Fish, BarChart3 } from "lucide-react";
import { Analytics } from "@vercel/analytics/next"

const navItems = [
  { name: "Dashboard", page: "/", icon: BarChart3 },
  { name: "Species Database", page: "/species-database", icon: Fish },
];

const Layout = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
       <Analytics />
      <nav className="bg-gradient-to-r from-blue-800 via-blue-700 to-cyan-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Waves className="w-8 h-8 text-cyan-200" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="font-bold text-xl bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                  Oceanographic Data Platform
                </h1>
                <p className="text-cyan-200 text-sm">Ocean Conditions & Species Monitoring</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.page}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-cyan-100 hover:text-white hover:bg-white/10"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden md:inline">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* The <Outlet /> is the key. It renders the content of the nested route. */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
       
      </main>

      <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>
            &copy; 2025 Oceanographic Data Platform. Protecting our oceans
            for future generations.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;