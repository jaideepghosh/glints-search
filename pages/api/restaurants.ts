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

        let result;
        let response_error;
        if(search_key){
            const { data, error } = await supabase
                .from(APP_CONSTANTS.restaurants)
                .select()
                .textSearch('name', search_key)
                .range(start_limit,end_limit);
            if(error)
                response_error = error;
            result = data;
        } else {
            const { data, error } = await supabase
                .from(APP_CONSTANTS.restaurants)
                .select()
                .range(start_limit,end_limit);
            if(error)
                response_error = error;
            result = data;
        }
        if(response_error)
            return res.status(500).json(response_error);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong.' })
    }
}
