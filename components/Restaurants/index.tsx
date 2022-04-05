import Accordion from "../Accordion";
import Schedule from "./Schedule";
import SearchForm from "./SearchForm";

export default function Restaurants() {
    return (
      <div className="min-h-full flex items-center justify-center py-12 px-8 sm:px-6 lg:px-8">          
        <div className="">
            <SearchForm/>

            <div className="bg-white rounded-lg shadow">
              <Accordion title={'Kushi Tsuru'}>
                <Schedule/>
              </Accordion>
              <Accordion title={'Osakaya Restaurant'} >
                <Schedule/>
              </Accordion>
              <Accordion title={'The Stinking Rose'} >
                <Schedule/>
              </Accordion>
            </div>
        </div>
      </div>      
    );
}