import { createEvent } from '../supabaseClient';
import Sentry from '@sentry/browser';

export const submitProperty = async (form, setSuccess, setForm, setLoading) => {
    setLoading(true);
    try {
        const result = await createEvent('chatgpt_request', {
            prompt: `Add a new property with the following details: ${JSON.stringify(form)}`,
            response_type: 'json'
        });
        setSuccess('Property added successfully!');
        Sentry.addBreadcrumb({ message: 'Added new property' });
        setForm({
            type: '',
            name: '',
            location: '',
            price: '',
            description: '',
            imageUrl: ''
        });
    } catch (error) {
        Sentry.captureException(error);
    } finally {
        setLoading(false);
    }
};