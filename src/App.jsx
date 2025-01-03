import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from './supabaseClient';
import Home from './pages/Home';
import BrowseProperties from './pages/BrowseProperties';
import AddProperty from './pages/AddProperty';
import PropertyDetails from './pages/PropertyDetails';
import MyListings from './pages/MyListings';
import Sentry from '@sentry/browser';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const session = supabase.auth.session();
        setUser(session?.user ?? null);

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null);
                Sentry.addBreadcrumb({ message: `Auth event: ${event}` });
            }
        );

        return () => {
            authListener.unsubscribe();
        };
    }, []);

    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Header user={user} />
                <main className="flex-1 p-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/browse" element={<BrowseProperties />} />
                        <Route path="/add-property" element={<AddProperty />} />
                        <Route path="/property/:id" element={<PropertyDetails />} />
                        <Route path="/my-listings" element={<MyListings />} />
                        <Route path="/signin" element={<Auth
                            supabaseClient={supabase}
                            providers={['google', 'facebook', 'apple']}
                            appearance={{ theme: 'default' }}
                            theme="dark"
                        />}
                        />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}