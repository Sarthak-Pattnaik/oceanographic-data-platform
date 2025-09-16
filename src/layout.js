import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Waves, Fish, MapPin, Shield, BarChart3, Search } from 'lucide-react';

const navItems = [
    { name: 'Dashboard', page: 'Dashboard', icon: BarChart3 },
    { name: 'Species Database', page: 'SpeciesDatabase', icon: Fish },
    { name: 'Research Sites', page: 'ResearchSites', icon: MapPin },
    { name: 'Conservation', page: 'Conservation', icon: Shield },
    { name: 'Species Explorer', page: 'SpeciesExplorer', icon: Search },
];

export default function Layout({ children, currentPageName }) {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
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
                                    Marine Biodiversity Research Platform
                                </h1>
                                <p className="text-cyan-200 text-sm">Ocean Conservation & Species Monitoring</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                            {navItems.map(item => {
                                const url = createPageUrl(item.page);
                                const isActive = location.pathname === url;
                                const Icon = item.icon;
                                return (
                                    <Link 
                                        key={item.name} 
                                        to={url} 
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                                            isActive 
                                                ? 'bg-white/20 text-white font-semibold backdrop-blur-sm' 
                                                : 'text-cyan-100 hover:text-white hover:bg-white/10'
                                        }`}
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
            
            <main className="max-w-7xl mx-auto px-4 py-6">
                {children}
            </main>
            
            {/* Footer */}
            <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>&copy; 2024 Marine Biodiversity Research Platform. Protecting our oceans for future generations.</p>
                </div>
            </footer>
        </div>
    );
}