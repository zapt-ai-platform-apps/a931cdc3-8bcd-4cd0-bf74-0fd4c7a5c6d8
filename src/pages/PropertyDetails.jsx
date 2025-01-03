import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProperty, contactSeller } from '../services/propertyService';
import Sentry from '@sentry/browser';

export default function PropertyDetails() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [contactLoading, setContactLoading] = useState(false);

    useEffect(() => {
        fetchPropertyData();
    }, [id]);

    const fetchPropertyData = async () => {
        setLoading(true);
        try {
            const data = await fetchProperty(id);
            setProperty(data);
            Sentry.addBreadcrumb({ message: `Fetched property with ID: ${id}` });
        } catch (error) {
            Sentry.captureException(error);
        } finally {
            setLoading(false);
        }
    };

    const handleContact = async () => {
        setContactLoading(true);
        try {
            await contactSeller(id);
            setMessage('Your message has been sent!');
            Sentry.addBreadcrumb({ message: 'Contacted seller' });
        } catch (error) {
            Sentry.captureException(error);
            setMessage('Failed to send message.');
        } finally {
            setContactLoading(false);
        }
    };

    return (
        <div className="h-full max-w-4xl mx-auto">
            {loading ? (
                <p>Loading property details...</p>
            ) : property ? (
                <div>
                    <h2 className="text-3xl font-semibold mb-4">{property.name}</h2>
                    <img
                        src={property.imageUrl}
                        alt={property.name}
                        className="w-full h-64 object-cover mb-4"
                    />
                    <p className="text-gray-700 mb-2"><strong>Type:</strong> {property.type}</p>
                    <p className="text-gray-700 mb-2"><strong>Location:</strong> {property.location}</p>
                    <p className="text-gray-700 mb-2"><strong>Price:</strong> ${property.price}</p>
                    <p className="text-gray-700 mb-4"><strong>Description:</strong> {property.description}</p>
                    <button
                        className="cursor-pointer bg-blue-500 text-white p-2 rounded"
                        onClick={handleContact}
                        disabled={contactLoading}
                    >
                        {contactLoading ? 'Sending...' : 'Contact Seller'}
                    </button>
                    {message && <p className="mt-4 text-green-500">{message}</p>}
                </div>
            ) : (
                <p>Property not found.</p>
            )}
        </div>
    );
}