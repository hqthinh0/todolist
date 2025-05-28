import React, { useEffect, useState , useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTodoList, addTodo, sortTodo, setSearchTerm, updateTodo, deletodo} from '../store/slice';

import Heading from '../components/Heading';
import TodoItem from '../components/TodoItem';
import TodoModal from '../components/Modal';
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

  // lưu vào trong localstorage
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
    if (newTask.trim().length === 0) return toast.error('Lỗi Chưa nhập thông tin');

    if (edit){
        dispatch(updateTodo({
            id: edit ? update : Date.now(),
            task: newTask,
            description : description,
            status : status,
        }));
        setEdit(false);
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

    dispatch(deletodo(todo));
    toast.success('Đã xoá todo thành công');
  }

  return (
    <>
        {showModal && (
          <TodoModal showModal={showModal}   setShowModal={setShowModal}  edit={edit}  status={status}  setStatus={setStatus}  listItem={listItem}  newTask={newTask}  setNewTask={setNewTask}  description={description} setDescription={setDescription}  handleTodo={handleTodo}  />  )}

        <Heading filterStatus={sortCriteria} setFilterStatus={(value) => dispatch(sortTodo(value))} searchText={searchTerm} setSearchText={(value) => dispatch(setSearchTerm(value))} onAddTodo={() => setShowModal(true)} />
          

        <div className=''>
          {filteredList.length > 0 ? ( filteredList.map((todo) => (
            <TodoItem key={todo.id} todo={todo} handlehandleEdit={handlehandleEdit} handleDelete={handleDelete} />
          ))) : ( <p className="text-center text-gray-500 mt-10"> Danh sách đang rỗng</p>  )}
        </div>
    </>

  );
};

export default Todolist;


