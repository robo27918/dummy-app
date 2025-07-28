import React from 'react';
const Spinner = ()=>{
    return(
        <div className="flex justify-center items-center py-6">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
        </div>
    )
}
export default Spinner;