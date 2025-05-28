import React from 'react'

const Heading = ({ filterStatus, setFilterStatus, searchText, setSearchText, onAddTodo }) => {
  return (
    <div className="mb-6">
      <label htmlFor="search" className="block font-semibold text-4xl text-center mb-3.5 text-gray-700 text-red-500">App Todolist</label>
     
      <input
        id="search"
        type="text"
        placeholder="Tìm kiếm"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className='md:flex justify-between sm:block'>
          
          <div className="flex items-center space-x-4 mt-3">
            {['all', 'Todo', 'In Progress', 'Done'].map((status) => (
              <label key={status} className="flex items-center space-x-1 text-sm text-gray-700">
                <input
                  type="radio"
                  name="status"
                  value={status}
                  checked={filterStatus === status}
                  onChange={() => setFilterStatus(status)}
                  className=""
                />
                <span>{status}</span>
              </label>
            ))}
          </div>
          <button onClick={onAddTodo}  className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200"> Thêm công việc </button>
      </div>
    

      
    </div>
  );
};

export default Heading