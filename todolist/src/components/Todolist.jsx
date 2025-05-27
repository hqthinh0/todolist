import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTodoList,
  addTodo,
  sortTodo,
  setSearchTerm,
  updateTodo,
  deletodo,
} from '../store/slice';
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from 'react-toastify';

const Todolist = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);

  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('Todo');
  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState('');
  const [update, setUpdate] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem('todolist', JSON.stringify(todoList));
    }
  }, [todoList]);

  useEffect(() => {
    const localList = JSON.parse(localStorage.getItem('todolist'));
    if (localList) {
      dispatch(setTodoList(localList));
    }
  }, [dispatch]);

  const handlehandleEdit = (todo) =>{
    setEdit(true);
    setShowModal(true);
    setUpdate(todo.id)
    setStatus(todo.status);
    setNewTask(todo.task);
    setDescription(todo.description);
  }


  const handleTodo = () => {
    if (newTask.trim().length === 0) return toast.error('Lỗi Chưa nhập thông tin');;

    if (edit){
        dispatch(updateTodo({
            id: edit ? update : Date.now(),
            task: newTask,
            description : description,
            status : status,
        }));
        toast.success('chỉnh sửa thành công');
    }else{
        dispatch( addTodo({
                id: Date.now(),
                task: newTask,
                description : description,
                status : status,
            })
         );
        toast.success('Thêm vào Todolist thành công');
    }
   
    setNewTask('');
    setDescription('');
    setStatus('Todo');
    setShowModal(false);
   
  };

  const handleDelete = (todo) =>{
    console.log("todo",todo);
    dispatch(deletodo(todo))
  }

  const renderModal = () => (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Thêm công việc mới</h2>

        <div className="mb-4">
          <label className="block font-medium mb-2">Trạng thái:</label>
          <div className="flex gap-4">
            {['Todo', 'In Progress', 'Done'].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value={option}
                  checked={status === option}
                  onChange={() => setStatus(option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <input type="text" placeholder="Nhập tên công việc..."  value={newTask}  onChange={(e) => setNewTask(e.target.value)} className="w-full border border-gray-300 p-2 rounded-md mb-4" />
        <textarea value={description}  onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 p-2 rounded-md mb-4"  placeholder="Nhập mô tả công việc..." />

        <div className="flex justify-end space-x-2">
          <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400" >  Hủy </button>
          
          <button onClick={ handleTodo } className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"> {edit ? "Cập nhật" : "Thêm"}  </button>
        </div>
        <button onClick={() => setShowModal(false)}  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl" > × </button>
      </div>
    </div>
  );

  return (
    <>
         <div className="p-4">
            <button className="bg-amber-400 text-white px-4 py-2 rounded-md hover:bg-amber-500"  onClick={() => setShowModal(true)} >  Thêm công việc </button>
            {showModal && renderModal()}
        </div>

        <div className=''>
        {todoList.map((todo) => (
          <div key={todo.id} className={`border m-4 p-4 rounded-md shadow-md flex justify-between items-start ` }>
            <div>
              <h3 className="text-lg font-semibold">{todo.task}</h3>
              <p className="text-sm text-gray-600">{todo.description}</p>
              <span className={`text-xs mt-1 inline-block px-2 py-1 rounded-full ${todo.status === "Done" ? "bg-green-200 text-green-800" : todo.status === "In Progress" ? "bg-yellow-200 text-yellow-800" : "bg-gray-200 text-gray-800"}`}>
                {todo.status}
              </span>
            </div>
            <div className="space-x-2 max-h-full">
            <button onClick={() => handlehandleEdit(todo)} className="px-3 py-1 h-10 bg-blue-500 text-white rounded hover:bg-blue-600"><MdOutlineEdit /></button>
            <button onClick={() => handleDelete(todo.id)} className="px-3 h-10 py-1 bg-red-500 text-white rounded hover:bg-red-600"><RiDeleteBin5Line /></button>
            </div>
          </div>
        ))}
        </div>
    </>
   

    
  );
};

export default Todolist;


