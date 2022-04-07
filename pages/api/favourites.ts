// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const supabase = require('../../shared/db_client');
const APP_CONSTANTS = require('../../shared/constants');

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try {
        if(!req.query || !req.query.user_id) {
            return res.status(500).json({
                message: 'User id is required.'
            });
        }

        // Handle pagination
        const user_id = (req.query && req.query.user_id)? req.query.user_id: null;

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
