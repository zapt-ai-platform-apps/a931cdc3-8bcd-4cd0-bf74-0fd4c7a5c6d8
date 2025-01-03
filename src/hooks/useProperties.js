import { useEffect, useState } from 'react';
import { createEvent } from '../supabaseClient';
import Sentry from '@sentry/browser';
import supabase from '../supabaseClient';

export function useProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        type: '',
        priceMin: '',
        priceMax: '',
        location: ''
    });

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/getProperties', {
                headers: {
                    'Authorization': `Bearer ${supabase.auth.session()?.access_token}`
                }
            });
            const data = await response.json();
            setProperties(data);
            Sentry.addBreadcrumb({ message: 'Fetched properties' });
        } catch (error) {
            Sentry.captureException(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const applyFilters = async () => {
        setLoading(true);
        try {
            const result = await createEvent('chatgpt_request', {
                prompt: `Filter properties with the following criteria: ${JSON.stringify(filters)}`,
                response_type: 'json'
            });
            setProperties(result.data);
            Sentry.addBreadcrumb({ message: 'Applied filters' });
        } catch (error) {
            Sentry.captureException(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        properties,
        loading,
        filters,
        handleFilterChange,
        applyFilters
    };
}