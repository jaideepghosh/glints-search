export default function SearchForm() {
    return (
        <div className="flex flex-wrap -mx-2 space-y-4 md:space-y-0 mb-10">
            <div className="w-full px-2 md:w-1/3">
            <input className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text"  placeholder="Restaurant name..."/>
            </div>
            <div className="w-full px-2 md:w-1/4">
                <select name="open_hour" className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline">
                    <option value="" disabled selected>Opening Hour</option>
                    <option value="">09:00 am</option>
                    <option value="">09:00 am</option>
                    <option value="">09:00 am</option>
                </select>
            </div>
            <div className="w-full px-2 md:w-1/4">
                <select name="close_hour" className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline">
                    <option value="" disabled selected>Closing Hour</option>
                    <option value="">09:00 am</option>
                    <option value="">09:00 am</option>
                    <option value="">09:00 am</option>
                </select>
            </div>
            <div className="w-full px-2 md:w-1/6 text-center">
                <button className="bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Search</span>
                </button>
            </div>
      </div>  
    );
}