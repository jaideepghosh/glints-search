import { RestaurantResponseType } from "../../shared/types";
import Accordion from "../Accordion";
import Schedule from "./Schedule";
import SearchForm from "./SearchForm";

export default function Restaurants() {
  const restaurants: Array<RestaurantResponseType> = [{"id":1,"name":"Kushi Tsuru","schedule":[{"day":"Mon","start":"11:30:00","end":"21:00:00"},{"day":"Tues","start":"11:30:00","end":"21:00:00"},{"day":"Wed","start":"11:30:00","end":"21:00:00"},{"day":"Thu","start":"11:30:00","end":"21:00:00"},{"day":"Fri","start":"11:30:00","end":"21:00:00"},{"day":"Sat","start":"11:30:00","end":"21:00:00"},{"day":"Sun","start":"11:30:00","end":"21:00:00"}]},{"id":2,"name":"Osakaya Restaurant","schedule":[{"day":"Mon","start":"11:30:00","end":"21:00:00"},{"day":"Tues","start":"11:30:00","end":"21:00:00"},{"day":"Wed","start":"11:30:00","end":"21:00:00"},{"day":"Thu","start":"11:30:00","end":"21:00:00"},{"day":"Sun","start":"11:30:00","end":"21:00:00"},{"day":"Fri","start":"11:30:00","end":"21:30:00"},{"day":"Sat","start":"11:30:00","end":"21:30:00"}]},{"id":3,"name":"The Stinking Rose","schedule":[{"day":"Mon","start":"11:30:00","end":"22:00:00"},{"day":"Tues","start":"11:30:00","end":"22:00:00"},{"day":"Wed","start":"11:30:00","end":"22:00:00"},{"day":"Thu","start":"11:30:00","end":"22:00:00"},{"day":"Sun","start":"11:30:00","end":"22:00:00"},{"day":"Fri","start":"11:30:00","end":"23:00:00"},{"day":"Sat","start":"11:30:00","end":"23:00:00"}]},{"id":4,"name":"McCormick & Kuleto's","schedule":[{"day":"Mon","start":"11:30:00","end":"22:00:00"},{"day":"Tues","start":"11:30:00","end":"22:00:00"},{"day":"Wed","start":"11:30:00","end":"22:00:00"},{"day":"Thu","start":"11:30:00","end":"22:00:00"},{"day":"Sun","start":"11:30:00","end":"22:00:00"},{"day":"Fri","start":"11:30:00","end":"23:00:00"},{"day":"Sat","start":"11:30:00","end":"23:00:00"}]},{"id":5,"name":"Mifune Restaurant","schedule":[{"day":"Mon","start":"11:00:00","end":"22:00:00"},{"day":"Tues","start":"11:00:00","end":"22:00:00"},{"day":"Wed","start":"11:00:00","end":"22:00:00"},{"day":"Thu","start":"11:00:00","end":"22:00:00"},{"day":"Fri","start":"11:00:00","end":"22:00:00"},{"day":"Sat","start":"11:00:00","end":"22:00:00"},{"day":"Sun","start":"11:00:00","end":"22:00:00"}]},{"id":6,"name":"The Cheesecake Factory","schedule":[{"day":"Mon","start":"11:00:00","end":"23:00:00"},{"day":"Tues","start":"11:00:00","end":"23:00:00"},{"day":"Wed","start":"11:00:00","end":"23:00:00"},{"day":"Thu","start":"11:00:00","end":"23:00:00"},{"day":"Fri","start":"11:00:00","end":"00:30:00"},{"day":"Sat","start":"11:00:00","end":"00:30:00"},{"day":"Sun","start":"10:00:00","end":"23:00:00"}]}];
    return (
      <div className="min-h-full flex items-center justify-center py-12 px-8 sm:px-6 lg:px-8">          
        <div className="">
            <SearchForm/>

            <div className="bg-white rounded-lg shadow">
            {
              restaurants.map((restaurant)=>(
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