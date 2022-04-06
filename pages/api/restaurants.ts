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
        // Handle pagination
        const start_limit = (req.query && req.query.start)? req.query.start: 0;
        const end_limit = (req.query && req.query.end)? req.query.end: 10;

        //Handle search query
        const search_key = (req.query && req.query.search_key)? req.query.search_key: null;

        const select_values = `
            id,
            name,
            schedule: restaurants_schedule (
                day,
                start,
                end
            )
        `;

        let query = supabase
            .from(APP_CONSTANTS.restaurants)
            .select(select_values);

        if (search_key) {
            query = query.textSearch('name', search_key);
        }

        // Set range at the end.
        query = query.range(start_limit,end_limit);

        const { data, error } = await query;

        if(error)
            return res.status(500).json(error);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong.' })
    }
}
