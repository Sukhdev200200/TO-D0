import { useState ,useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import { v4 as uuidv4 } from 'uuid';
import Marquee from "react-fast-marquee";
import Datetime from 'react-datetime';

function App() {
  const [todo, setTodo] = useState('')
  const [todos,setTodos] = useState([])
  const [Finished, setFinished] = useState(true)


  useEffect(() => {
  let todo = localStorage.getItem("todos")
  if(todo){
    let todoSave = JSON.parse(localStorage.getItem("todos"))
    setTodos(todoSave)

  }
  }, [])

  const toggleFinished = (e) =>{
    setFinished(!Finished)
  }
  

  const saveData = (params)=>{
    localStorage.setItem("todos", JSON.stringify(todos))

  }
  

  const handleAdd =()=>{
    setTodos([...todos,{id: uuidv4(),todo,isCompleted: false}])
    setTodo ("")
    saveData()

  }
  const handleChange =(e)=>{
    setTodo(e.target.value)
   
   

  }
  const handleEdit  =(e,id)=>{
    let T = todos.filter(i=>i.id === id)
    setTodo(T[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!== id
    });
    setTodos(newTodos)
    saveData()
 
  }
  const handleDelete =(e,id)=>{
    let index = todos.findIndex(item =>{
      return item.id === id;

    })
    let newTodos = todos.filter(item=>{
      return item.id != id
    });
    setTodos(newTodos)
    saveData()

    
  }
  const handleCheck = (e)=>{
    let id = e.target.name
    let index = todos.findIndex(item =>{
      return item.id === id;

    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    console.log(newTodos,todos)
    saveData()
   


  }


  return (
    <>
     <Navbar/>
     
     <div className="md:container md:mx-auto md:w-[50%] m-4 rounded-lg p-4  bg-cyan-200  min-h-screen">
      <div className="add-todo gap-2">
        <Marquee className='font-bold m-3'>The secret of your future is hidden in your daily routine</Marquee>
        <h2 className='font-bold '>Add-Your-Activity</h2>
        <input onChange={handleChange} value={todo} type="text" className='w-5/6 m-3 ' />
        <button onClick={handleAdd}  disabled={todo.length<=3} className='disabled:bg-neutral-600  bg-neutral-600 hover:bg-neutral-950 mx-6 font-bold text-white  rounded-lg  text-sm p-3 py-1 cursor-pointer '>Add</button>
      </div>
      <input onChange={toggleFinished} type="checkbox"  checked={Finished} id="show" className='m-6'/>
      <label htmlFor="">Completed Activities</label>
       <h2 className='text-xl font-bold mx-auto m-4'>Pending Activities</h2>
      <div className="todos">
        {todos.length === 0 && <div className='m-8'>There is no Agenda</div>}
        {todos.map(item=>{
          return (Finished || !item.isCompleted)&&<div key={item.id} className="todo flex my-2 justify-between w-1/4">
            <div className="flex gap-4 ">
            <input type="checkbox" name={item.id}  onChange={handleCheck} value={item.isCompleted} />
            <div className="text">
            <div  className={item.isCompleted?"line-through":""} >{item.todo}</div>
            </div>
          </div>
          <div className="buttons flex cursor-pointer h-full justify-between">
          <button onClick={(e)=>{handleEdit(e,item.id)}} className= '   bg-neutral-950  font-bold text-white  rounded-md mx-1 p-3 py-1 text-sm '>Edit</button>
          <button onClick={(e)=>{handleDelete(e,item.id)}} className='   bg-neutral-950  font-bold text-white  rounded-md p-3 py-1 mx-1 text-sm '>Delete</button>
          </div>

        </div>
    })}
      </div>
     </div>
     <Footer/>
    </>
  )
}

export default App
