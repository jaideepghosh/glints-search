import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseData } from '../shared/types';
const supabase = require('../shared/db_client');
const APP_CONSTANTS = require('../shared/constants');

export const getFavouriteRestaurants = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    try {
        const user_id = (req.query && req.query.user_id)? req.query.user_id: null;
        
        // Handle pagination
        const start_limit = (req.query && req.query.start)? req.query.start: 0;
        const end_limit = (req.query && req.query.end)? req.query.end: 10;

        const select_values = `
            id,
            user_id,
            restaurant: restaurants (
                id,
                name,
                schedule: restaurants_schedule (
                    day,
                    start,
                    end
                )
            )
        `;

        let query = supabase
            .from(APP_CONSTANTS.favourites)
            .select(select_values);

        if(user_id) {
            query = query.eq('user_id', user_id);
        }

        // Set range at the end.
        query = query.range(start_limit,end_limit);

        let { data, error } = await query;

        if(error)
            return res.status(500).json(error);

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong.' })
    }
}

export const addFavouriteRestaurant = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    const user_id = (req.query && req.query.user_id)? req.query.user_id: null;

    if (!req.body || !req.body.restaurant_id) {
        return res.status(500).json({
            message: 'Restaurant id is required.'
        });
    }

    try {
        const restaurant_id = req.body.restaurant_id;
        const { data, error } = await supabase
            .from(APP_CONSTANTS.favourites)
            .insert([
                { restaurant_id: restaurant_id, user_id: user_id }
            ]);
    
        if(error)
            return res.status(500).json(error);

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong.' })
    }
}
