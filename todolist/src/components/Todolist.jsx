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
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);
  const searchTerm = useSelector((state) => state.todo.searchTerm);

  const filteredList = todoList.filter((todo) => {
    const matchStatus = sortCriteria === "all" || todo.status === sortCriteria;
    const matchSearch = todo.task.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const [listItem, setListItem ] = useState(['Todo', 'In Progress', 'Done']);
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

    dispatch(deletodo(todo))
  }

  const renderModal = () => (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Thêm công việc mới</h2>
        
        <div className="mb-4">
          <label className="block font-medium mb-2">Trạng thái:</label>
          <div className="flex gap-4">
            {listItem.map((option) => (
              <label key={option} className="flex cursor-pointer items-center gap-2 py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                <input
                  type="radio"
                  className='w-4 h-4 text-blue-600 cursor-pointer border-gray-300 bg-gray-100 '
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
          <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 hover:cursor-pointer text-gray-800 rounded hover:bg-gray-400" >  Hủy </button>
          
          <button onClick={handleTodo} className="px-4 py-2 bg-amber-500 text-white rounded hover:cursor-pointer hover:bg-amber-600"> {edit ? "Cập nhật" : "Thêm"}  </button>
        </div>
        <button onClick={() => setShowModal(false)}  className="absolute top-2 right-2 hover:cursor-pointer text-gray-500 hover:text-gray-700 text-xl" > × </button>
      </div>
    </div>
  );
  return (


    <>
            <input type="text" value={searchTerm} onChange={(e) => dispatch(setSearchTerm(e.target.value))} placeholder="Tìm kiếm công việc..." className="border border-gray-300 px-3 py-2 rounded-md w-64" />
            <div className="flex gap-4 px-4 mb-4">
            {["all", "Todo", "In Progress", "Done"].map((status) => (
                <label key={status} className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="filter"
                    value={status}
                    checked={useSelector(state => state.todo.sortCriteria) === status}
                    onChange={() => dispatch(sortTodo(status))}
                    className="accent-amber-500"
                />
                <span>{status}</span>
                </label>
            ))}
            </div>

         <div className="p-4">
            <button className="bg-amber-400 text-white px-4 py-2 rounded-md hover:bg-amber-500"  onClick={() => setShowModal(true)} >  Thêm công việc </button>
            {showModal && renderModal()}
        </div>

        <div className=''>
        {filteredList.map((todo) => (
          <div key={todo.id} className={` border-l-8 ${todo.status === "Done" ? "border-l-green-200" : todo.status === "In Progress" ? "border-l-yellow-200 " : "border-l-gray-200"} border m-4 p-4 rounded-md shadow-md flex justify-between items-center ` }>
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
        ))}
        </div>
    </>
   

    
  );
};

export default Todolist;


