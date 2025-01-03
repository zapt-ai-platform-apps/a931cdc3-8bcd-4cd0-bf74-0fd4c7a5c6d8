import React from 'react';
import { Link } from 'react-router-dom';

export default function PropertyCard({ property }) {
    return (
        <div className="border p-4 rounded shadow hover:shadow-lg transition-shadow duration-300">
            <img
                src={property.imageUrl}
                alt={property.name}
                className="w-full h-40 object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">{property.name}</h3>
            <p className="text-gray-600">${property.price}</p>
            <p className="text-gray-600">{property.location}</p>
            <Link to={`/property/${property.id}`} className="text-blue-500 hover:underline mt-2 block cursor-pointer">
                View Details
            </Link>
        </div>
    );
}