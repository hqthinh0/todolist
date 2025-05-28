import React from "react";
import { IoClose } from "react-icons/io5";

const Modal  = ({ showModal, setShowModal, listItem, status, setStatus, newTask, setNewTask, description, setDescription, handleTodo, edit }) => {
    if (!showModal) return null;
   
    return (
      <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative m-5">
          <h2 className="text-xl font-semibold mb-4">{edit ? "Cập nhật công việc" : "Thêm công việc mới"}</h2>
          
          <div className="mb-4">
            <label className="block font-medium mb-2">Trạng thái:</label>
            <div className="flex gap-4">
              {listItem.map((option) => (
                <label key={option} className="flex cursor-pointer items-center gap-2 text-sm">
                  <input type="radio" className='w-4 h-4 text-blue-600 cursor-pointer'  name={option.trim()} value={option} checked={status.trim() === option.trim()}   onChange={() => { setStatus(option); }} /> {option.trim()} </label>
              ))}
            </div>
          </div>
          <input type="text" placeholder="Nhập công việc " value={newTask} onChange={(e) => setNewTask(e.target.value)} className="w-full border border-gray-300 p-2 rounded-md mb-4"  />
  
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 p-2 rounded-md mb-4"  placeholder="mô tả công việc"  />
  
          <div className="flex justify-end space-x-2">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"> Hủy  </button>
            <button onClick={handleTodo} className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"> {edit ? "Cập nhật" : "Thêm"} </button>
          </div>
          <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-500 text-xl">  <IoClose />  </button>
        </div>
      </div>
    );
  };

  export default Modal;