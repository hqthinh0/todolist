import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";


const TodoItem = ({ todo, handlehandleEdit , handleDelete }) => {

  return (
	<div key={todo.id} className={`border-l-4 ${ todo.status === "Done"  ? "border-green-500" : todo.status === "In Progress"  ? "border-yellow-500"  : "border-gray-400" } bg-white mt-3 mb-3 border p-4 rounded-xl shadow-md flex bo justify-between items-start gap-4 align-items`}>
		<div className='break-all pr-5'>
			<h3 className="font-semibold text-2xl">{todo.task}</h3>
			<p className="text-sm p-1.5 pl-0 text-gray-600">{todo.description}</p>
			<span className={`text-xs mt-1 inline-block px-2 py-1 rounded-full ${todo.status === "Done" ? "bg-green-200 text-green-800" : todo.status === "In Progress" ? "bg-yellow-200 text-yellow-800" : "bg-gray-200 text-gray-800"}`}>
			{todo.status}
			</span>
		</div>
		<div className=" space-x-2 flex justify-end">
			<button onClick={() => handlehandleEdit(todo)} className="text-white bg-green-700 hover:bg-green-800 hover:cursor-pointer font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><MdOutlineEdit fontSize={20} /></button>
			<button onClick={() => handleDelete(todo.id)} className="text-white bg-red-700 hover:bg-red-800 hover:cursor-pointer font-medium rounded-full active:border:none text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><RiDeleteBin5Line fontSize={20 } /></button>
		</div>
	</div> 
  );
};

export default TodoItem;