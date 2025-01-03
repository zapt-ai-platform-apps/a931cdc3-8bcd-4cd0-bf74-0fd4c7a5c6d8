import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const createEvent = async (type, payload) => {
    const { data, error } = await supabase
        .from('events')
        .insert([{ type, payload }]);
    if (error) {
        throw error;
    }
    return data;
};