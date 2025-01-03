import React, { useState } from 'react';
import Sentry from '@sentry/browser';
import { submitProperty } from '../utils/propertyService';

export default function AddPropertyForm() {
    const [form, setForm] = useState({
        type: '',
        name: '',
        location: '',
        price: '',
        description: '',
        imageUrl: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        await submitProperty(form, setSuccess, setForm, setLoading);
    };

    return (
        <>
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <div className="space-y-4">
                <input
                    type="text"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    placeholder="Property Type*"
                    className="box-border p-2 border border-gray-300 rounded w-full"
                />
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Property Name*"
                    className="box-border p-2 border border-gray-300 rounded w-full"
                />
                <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Location*"
                    className="box-border p-2 border border-gray-300 rounded w-full"
                />
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price*"
                    className="box-border p-2 border border-gray-300 rounded w-full"
                />
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description*"
                    className="box-border p-2 border border-gray-300 rounded w-full"
                />
                <input
                    type="text"
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    placeholder="Image URL*"
                    className="box-border p-2 border border-gray-300 rounded w-full"
                />
                <button
                    className="cursor-pointer bg-green-500 text-white p-2 rounded w-full"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit Property'}
                </button>
            </div>
        </>
    );
}