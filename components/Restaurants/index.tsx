import SearchForm from "./SearchForm";

export default function Restaurants() {
    return (
      <div className="min-h-full flex items-center justify-center py-12 px-8 sm:px-6 lg:px-8">          
        <div className="">
            <SearchForm/>

            <div className="bg-white rounded-lg shadow">
                <ul className="divide-y-2 divide-gray-100">
                    <li className="p-3">List Item 1</li>
                    <li className="p-3">List Item 2</li>
                    <li className="p-3">List Item 3</li>
                    <li className="p-3">List Item 4</li>
                </ul>
            </div>
        </div>
      </div>      
    );
}