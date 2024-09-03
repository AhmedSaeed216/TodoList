import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Tasks from './Components/Tasks'
import Home from './Components/Home'
import { v4 as uuidv4 } from 'uuid';




function App() {
  const a = 0
  // states
  const [todo, settodo] = useState("")    //it is a single todo
  const [todos, settodos] = useState([])    //this is an array that holds our all todo
  const [ShowFinished, setShowFinished] = useState(false)

  useEffect(() => {

    let todosstring=localStorage.getItem("todos");
    if (todosstring) {
      
      let todos=  JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    } 
  
  }, [])

  

  // routing
  const router = createBrowserRouter([
    { path: "/", element: <><Navbar /><Home /></> },
    { path: "/tasks", element: <><Navbar /><Tasks /></> }
  ])


  // function for local storage of data to the local storage of the browser
  const storeToLocal=()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const finishedTodos=(e)=>{
    setShowFinished(!ShowFinished)


  }
  const handleEdit = (e, id) => {

    let index = todos.filter(item => { return item.id === id })
    settodo(index[0].todo)
    let newTodos = todos.filter(item => { return item.id !== id })
    settodos(newTodos)
    storeToLocal();
  }

  const handleDelete = (e, id) => {
    const userConfirmation = window.confirm("Are u sure to Delete this Todo? ")
    if (userConfirmation) {
      let newTodos = todos.filter(item => {
        return item.id !== id;
      })
      settodos(newTodos);
      storeToLocal();
      // console.log(newTodos)
    }
    // else { console.log("no action") }
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    // console.log(todo)
    // console.log(todos)
    settodo("")
    storeToLocal();
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  // const HandleLine=(e)=>{
  //   let id=e.target.name;
  //   let index= todos.findIndex(item=>{return item.id===id})
  //   let newTodo=[...todos];
  //   newTodo[index].iscompleted=!newTodo[index].iscompleted
  //   settodos(newTodo)
  // }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    settodos(newTodos);
    // console.log(newTodos)
    storeToLocal();
  }
  return (
    <>

      <RouterProvider router={router} />


      <div className="container   bg-violet-100 rounded-xl p-5 min-h-screen ">
        <h2 className='heading text-2xl font-bold '>iTask - Manage your todos at one place</h2>
        <div className="addTodo my-5 ">
          <h2 className='text-lg font-bold mx-12'>Add Todo</h2>

          <input placeholder='Enter a todo'
            onChange={handleChange} value={todo}
            type="text"
            
            className=' w-80 border border-black rounded-md p-1 mx-2 '  />

          <button
            onClick={handleAdd}
            disabled={todo.length<=3}
            className='bg-black text-white hover:bg-gray-700 hover:text-black p-2 mx-2 rounded-md font-bold w-20   disabled:bg-blue-500'>
            Add
          </button>

        </div>
        <input type="checkbox" name="" checked={ShowFinished} id="" onChange={finishedTodos} /> Show Finsished
        <h2 className='text-2xl font-bold'>Your Todos</h2>

        <div className="todos ">
          {todos.map((item, index) => {

            return(ShowFinished || !item.iscompleted )&& <div key={item.id} className="todo flex  py-2 w-1/2 justify-between">
              <input onChange={handleCheckbox} type="checkbox" name={item.id} value={item.iscompleted} id="" />

              <div className={item.iscompleted ? "line-through" : ""}>
                {item.todo}
              </div>
              <div className="buttons flex h-full items-center justify-center">
                
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-black text-white hover:bg-gray-700 hover:text-black p-2  mx-2 rounded-md font-bold w-20'>Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-black text-white hover:bg-gray-700 hover:text-black p-2 mx-2 rounded-md font-bold  w-20'>Delete</button>
              </div>

            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App



// packages we used
// Router  => to add routing
// UUID => to generate the unique id's

// to store the data to the local storage of the browser we use :
// const storetolocal=()=>{
//   localStorage.setItem("todos",JSON.stringify(todos))
// }

// then useEffect hoook to rerender them

// useEffect(() => {
//   let todos=JSON.parse(localStorage.getItem("todos") )
// settodos(todos)
// }, [])
