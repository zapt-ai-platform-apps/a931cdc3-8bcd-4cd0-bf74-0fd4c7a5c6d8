import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createEvent } from '../supabaseClient';
import Sentry from '@sentry/browser';

export default function MyListings() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/getMyListings', {
                headers: {
                    'Authorization': `Bearer ${supabase.auth.session()?.access_token}`
                }
            });
            const data = await response.json();
            setListings(data);
            Sentry.addBreadcrumb({ message: 'Fetched user listings' });
        } catch (error) {
            Sentry.captureException(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full">
            <h2 className="text-2xl font-semibold mb-4">My Listings</h2>
            {loading ? (
                <p>Loading your listings...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {listings.map(listing => (
                        <div key={listing.id} className="border p-4 rounded shadow">
                            <img
                                src={listing.imageUrl}
                                alt={listing.name}
                                className="w-full h-40 object-cover mb-4"
                            />
                            <h3 className="text-xl font-semibold">{listing.name}</h3>
                            <p className="text-gray-600">${listing.price}</p>
                            <p className="text-gray-600">{listing.location}</p>
                            <Link to={`/property/${listing.id}`} className="text-blue-500 hover:underline mt-2 block">
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}