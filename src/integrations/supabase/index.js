import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

// EXAMPLE TYPES SECTION
// DO NOT USE TYPESCRIPT

Animal // table: animals
    id: number
    created_at: string
    name: string
    type: string
    size: string
    country_of_origin: string
    average_lifetime: string

Dish // table: dishes
    id: number
    created_at: string
    name: string
    country: string
    size: string
    type: string
    price: number

Drink // table: drinks
    id: number
    created_at: string
    name: string
    percentage: number
    country: string

*/

// Hooks for Animal table
export const useAnimals = () => useQuery({
    queryKey: ['animals'],
    queryFn: () => fromSupabase(supabase.from('animals').select('*')),
});

export const useAddAnimal = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newAnimal) => fromSupabase(supabase.from('animals').insert([newAnimal])),
        onSuccess: () => {
            queryClient.invalidateQueries('animals');
        },
    });
};

export const useUpdateAnimal = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedAnimal) => fromSupabase(supabase.from('animals').update(updatedAnimal).eq('id', updatedAnimal.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('animals');
        },
    });
};

export const useDeleteAnimal = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('animals').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('animals');
        },
    });
};

// Hooks for Dish table
export const useDishes = () => useQuery({
    queryKey: ['dishes'],
    queryFn: () => fromSupabase(supabase.from('dishes').select('*')),
});

export const useAddDish = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newDish) => fromSupabase(supabase.from('dishes').insert([newDish])),
        onSuccess: () => {
            queryClient.invalidateQueries('dishes');
        },
    });
};

export const useUpdateDish = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedDish) => fromSupabase(supabase.from('dishes').update(updatedDish).eq('id', updatedDish.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('dishes');
        },
    });
};

export const useDeleteDish = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('dishes').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('dishes');
        },
    });
};

// Hooks for Drink table
export const useDrinks = () => useQuery({
    queryKey: ['drinks'],
    queryFn: () => fromSupabase(supabase.from('drinks').select('*')),
});

export const useAddDrink = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newDrink) => fromSupabase(supabase.from('drinks').insert([newDrink])),
        onSuccess: () => {
            queryClient.invalidateQueries('drinks');
        },
    });
};

export const useUpdateDrink = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedDrink) => fromSupabase(supabase.from('drinks').update(updatedDrink).eq('id', updatedDrink.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('drinks');
        },
    });
};

export const useDeleteDrink = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('drinks').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('drinks');
        },
    });
};