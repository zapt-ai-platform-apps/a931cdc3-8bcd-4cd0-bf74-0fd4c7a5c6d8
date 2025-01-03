import React from 'react';
import { useProperties } from '../hooks/useProperties';
import PropertyCard from '../components/PropertyCard';

export default function BrowseProperties() {
    const {
        properties,
        loading,
        filters,
        handleFilterChange,
        applyFilters
    } = useProperties();

    return (
        <div className="h-full">
            <h2 className="text-2xl font-semibold mb-4">Browse Properties</h2>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    placeholder="Property Type"
                    className="box-border p-2 border border-gray-300 rounded"
                />
                <input
                    type="number"
                    name="priceMin"
                    value={filters.priceMin}
                    onChange={handleFilterChange}
                    placeholder="Min Price"
                    className="box-border p-2 border border-gray-300 rounded"
                />
                <input
                    type="number"
                    name="priceMax"
                    value={filters.priceMax}
                    onChange={handleFilterChange}
                    placeholder="Max Price"
                    className="box-border p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="Location"
                    className="box-border p-2 border border-gray-300 rounded"
                />
                <button
                    className="cursor-pointer bg-blue-500 text-white p-2 rounded"
                    onClick={applyFilters}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Apply Filters'}
                </button>
            </div>
            {loading ? (
                <p>Loading properties...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {properties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            )}
        </div>
    );
}