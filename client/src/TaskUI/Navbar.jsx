import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, LogOut, User, CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success('Logged out successfully');
        navigate('/register');
    };

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-colors duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/30">
                        <CheckSquare className="text-white" size={24} />
                    </div>
                    <span className="text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                        NO LIMIT
                    </span>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 transition-colors"
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* User Profile / Logout */}
                    <div className="relative">
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-white/10">
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-medium text-gray-900 dark:text-white leading-none">User</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Logged In</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <LogOut size={18} />
                                <span className="hidden md:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;