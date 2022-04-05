import { useEffect, useState } from "react";
import { RestaurantResponseType } from "../../shared/types";
import Accordion from "../Accordion";
import AccordionLoader from "../AccordionLoader";
import Schedule from "./Schedule";
import SearchForm from "./SearchForm";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState<Array<RestaurantResponseType>>([])
  useEffect(() => {
    fetch('api/restaurants?start=0&end=5')
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data)
      })
  }, []);
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-8 sm:px-6 lg:px-8">          
      <div className="">
          <SearchForm/>

          <div className="bg-white rounded-lg shadow">
            {
              !restaurants.length? <AccordionLoader/>: <></>
            }
            {
              !!restaurants.length && restaurants.map((restaurant)=>(
                <Accordion title={restaurant.name} key={restaurant.id}>
                  <Schedule schedule={restaurant.schedule}/>
              </Accordion>
              ))
            }
          </div>
      </div>
    </div>      
  );
}