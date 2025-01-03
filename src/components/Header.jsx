import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Header({ user }) {
    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">Real Estate App</Link>
            <nav className="space-x-4">
                <Link to="/browse" className="hover:text-gray-300">Browse Properties</Link>
                {user && <Link to="/add-property" className="hover:text-gray-300">Add Property</Link>}
                {user ? (
                    <button
                        className="cursor-pointer hover:text-gray-300"
                        onClick={() => supabase.auth.signOut()}
                    >
                        Sign Out
                    </button>
                ) : (
                    <Link to="/signin" className="hover:text-gray-300">Sign In</Link>
                )}
            </nav>
        </header>
    );
}