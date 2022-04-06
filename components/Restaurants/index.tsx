import { useEffect, useState } from "react";
import { RestaurantResponseType } from "../../shared/types";
import Accordion from "../Accordion";
import AccordionLoader from "../AccordionLoader";
import Schedule from "./Schedule";
import SearchForm from "./SearchForm";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState<RestaurantResponseType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoader] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const limit = 10;

  const loadNextpage = () => {
    setLoader(true);
    const newPage = page+1;
    fetchRestaurants(searchKey, (newPage*limit)-limit+1, newPage*limit);
    setPage(newPage);
  }

  const search = async (search_key: string) => {
    setRestaurants([]);
    setPage(1);
    setSearchKey(search_key);
    fetchRestaurants(search_key);
  }

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = (_searchKey: string = searchKey, start = 0, end = limit) => {
    const apiHeaders = new Headers();
    apiHeaders.append('pragma', 'no-cache');
    apiHeaders.append('cache-control', 'no-cache');
    const apiInit = {
      method: 'GET',
      headers: apiHeaders,
    };

    const apiRequest = new Request(`api/restaurants?start=${start}&end=${end}${_searchKey!=''?'&search_key='+_searchKey:''}`);
    
    fetch(apiRequest, apiInit)
    .then((response) => response.json())
    .then(__restaurants=>{
      setRestaurants(_restaurants => [..._restaurants, ...__restaurants])
      setLoader(false);
    }).catch((error) => {
      console.log(error);
      setLoader(false);
      throw new Error('Something went wrong.');
    });
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-8 sm:px-6 lg:px-8">          
      <div className="">
          <SearchForm search={search}/>

          <div className="bg-white rounded-lg shadow">
            {
              !restaurants.length? <AccordionLoader/>: <></>
            }
            {
              !!restaurants.length && restaurants.map((restaurant)=>(
                <Accordion title={restaurant.name} key={restaurant.id}>
                  <Schedule schedule={restaurant.schedule} id={restaurant.id}/>
                </Accordion>
              ))
            }
            {
              loading &&
              (
                <div className="text-center p-5">
                  <button className="bg-blue-400 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center" disabled>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Loading...</span>
                  </button>
                </div>
              )
            }
            {
              !!restaurants.length &&
              !loading &&
              (
                <div className="text-center p-5">
                  <button className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center" onClick={()=>{
                      loadNextpage();
                    }
                  }>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                      </svg>
                      <span>Load More</span>
                  </button>
                </div>
              )
            }
          </div>
      </div>
    </div>      
  );
}