// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { addFavouriteRestaurant, getFavouriteRestaurants } from '../../helpers/favourites';
import { ResponseData } from '../../shared/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    try {
        if(!req.query || !req.query.user_id) {
            return res.status(500).json({
                message: 'User id is required.'
            });
        }
        switch (req.method) {
            case 'GET':
                return getFavouriteRestaurants(req, res);
            case 'POST':
                return addFavouriteRestaurant(req, res);
            default:
                break;
        }
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong.' })
    }
}
