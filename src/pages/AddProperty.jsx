import React from 'react';
import AddPropertyForm from '../components/AddPropertyForm';

export default function AddProperty() {
    return (
        <div className="h-full max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Add a New Property</h2>
            <AddPropertyForm />
        </div>
    );
}