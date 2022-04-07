import { UserResource } from '@clerk/types';

const fetchFavouriteRestaurants = async (user: UserResource | null | undefined = null, start = 0, end = 0) => {
    const apiHeaders = new Headers();
    apiHeaders.append('pragma', 'no-cache');
    apiHeaders.append('cache-control', 'no-cache');
    const apiInit = {
    method: 'GET',
    headers: apiHeaders,
    };

    const apiAddress = (!end)?
                        `api/favourites?user_id=${user?.id}`:
                        `api/favourites?start=${start}&end=${end}&user_id=${user?.id}`;
    const apiRequest = new Request(apiAddress);
    
    try {
        const response = await fetch(apiRequest, apiInit);
        const jsonResponse = await response.json();
        const favouritesRestaurants = jsonResponse.map((favouritesRestaurant: any)=>{
            return favouritesRestaurant.restaurant
        })
        return favouritesRestaurants;
    } catch (error) {
        throw error;
    }
}

export default fetchFavouriteRestaurants