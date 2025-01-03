import { supabase } from '../supabaseClient';
import { createEvent } from '../supabaseClient';
import Sentry from '@sentry/browser';

export const fetchProperty = async (id) => {
    const response = await fetch(`/api/getProperty?id=${id}`, {
        headers: {
            'Authorization': `Bearer ${supabase.auth.session()?.access_token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch property');
    }
    const data = await response.json();
    return data;
};

export const contactSeller = async (id) => {
    const user = supabase.auth.user();
    if (!user) {
        throw new Error('User not authenticated');
    }
    await createEvent('text_to_speech', {
        text: `User ${user.email} has contacted you about property ID ${id}.`
    });
};