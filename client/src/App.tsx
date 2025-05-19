import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001";

function App() {

  type Todo = {
    todo_id: number;
    todo_desc: string;
    todo_completed: boolean;
  };
  
  type GetTodosResponse = Todo[];
  type AddTodoResponse = {
    success: boolean;
    newTodo: {
      rows: Todo[];
    };
  };
  type DeleteTodoResponse = {
    success: boolean;
  };
  

  const [inputTodo, setInputTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editTodoDesc, setEditTodoDesc] = useState("");
  const [editTodoId, setEditTodoId] = useState(0);
  const [editTodoChecked, setEditTodoChecked] = useState(false);

  useEffect(() => {
    const resp = axios.get<GetTodosResponse>("/todos").then(resp => {
      setTodos(resp.data);
    })
  }, []);

  async function addTodo(e: any) {
    const data = {
      desc: inputTodo,
      completed: "false",
    };
    const resp = await axios.post<AddTodoResponse>("/todos", data);
    if (resp.data.success) {
      setTodos(prevTodos => [...prevTodos, resp.data.newTodo.rows[0]])
    }
    setInputTodo("");
  }

  async function editTodo(e: any, todo: Todo) {
    setEditMode(true);
    setEditTodoDesc(todo.todo_desc);
    setEditTodoId(todo.todo_id);
    setEditTodoChecked(todo.todo_completed);
  }

  async function updateTodo(e: any) {
    const data = {
      desc: editTodoDesc,
      completed: editTodoChecked,
    };
    const resp = await axios.put<DeleteTodoResponse>(`/todos/${editTodoId}`, data);
    setEditMode(false);
    console.log(resp);
  }

  async function deleteTodo(e: any, todo: Todo) {
    const resp = await axios.delete<DeleteTodoResponse>(`/todos/${todo.todo_id}`)
    if (resp.data.success) {
      setTodos((prevTodos) => 
        prevTodos.filter(t => t.todo_id != todo.todo_id)
      );
    }
  }

  async function clearAllTodos(e: any) {
    const resp = await axios.delete<DeleteTodoResponse> ("/todos");
    if (resp.data.success) {
      setTodos([]);
    }
  }

  if (editMode) {
    return (
      <form
        onSubmit={updateTodo}
        className="flex flex-col items-center gap-8 pt-8 pb-24 bg-blue-50"
      >
        <div className="text-2xl">Edit Todo</div>
        <div className="flex gap-4 pl-16">
          <label className="text-xl">Todo Desc:</label>
          <input
            className="text-xl rounded-lg shadow-md"
            type="text"
            placeholder="Enter Todo"
            value={editTodoDesc}
            onChange={(e) => setEditTodoDesc(e.target.value)}
          />
        </div>
        <div className="flex gap-4 pr-36">
          <label className="text-xl">Completed:</label>
          <input
            type="checkbox"
            checked={editTodoChecked}
            onChange={(e) => setEditTodoChecked(e.target.checked)}
          />
        </div>
        <button className="bg-green-600 hover:bg-green-500 text-white py-1 px-2 rounded-md">
          Submit
        </button>
      </form>
    )
  }

  return (
    <div className="flex flex-col items-center gap-8 pt-8 pb-2 bg-blue-50">
      <div className='text-2xl'>To Do List</div>
      <div className='flex gap-2'>
        <input 
          className='border texts-xl rounded-lg shadow-md'
          type='text' 
          placeholder='  Enter a new task' 
          value={inputTodo} 
          onChange={e => setInputTodo(e.target.value)}
        />

        <button onClick={addTodo} className="text-lg bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded-xl">Add</button>
        <button onClick={clearAllTodos} className="text-lg bg-gray-500 hover:bg-gray-400 text-white py-1 px-2 rounded-xl">Clear</button>
      </div>
      {todos.length >= 1 && (
        <div className="flex flex-col gap-2 border bg-blue-200 rounded-lg p-2 w-5/6">
          {todos.map((todo, index) => {
            return (
              <div key={todo.todo_id} className='flex justify-between items-center bg-blue-700 text-white p-2 rounded-lg mb-2'>
                <div className='flex gap-2 pl-1'>
                  <input type='checkbox' checked={todo.todo_completed} readOnly />
                  <div className=''>{todo.todo_desc}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => editTodo(e, todo)}
                    className="bg-green-600 hover:bg-green-500 text-white py-1 px-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => deleteTodo(e, todo)}
                    className="bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}  
    </div>
  );
}

export default App;
