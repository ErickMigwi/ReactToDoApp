import React,{useState, useEffect, useCallback} from 'react'
export default function Todo() {
    let[task, setTask] = useState('')
let[description, setDescription]= useState('')
let [priority, setPriority] = useState('')
let [myObject, setMyObject] = useState({});
let [myArray, setMyArray] = useState([]);
let [todos, setTodos] = useState([]);
let [id, setId] =  useState(1)
let [complete, setComplete] = useState(false)

let handleTaskChange= (task)=>{
    setTask(task.target.value)
}
let handleDescriptionChange= (description)=>{
    setDescription(description.target.value)
}
let handlePriorityChange= (priority)=>{
    setPriority(priority.target.value)
}
let addTask = useCallback( (event)=>{
    event.preventDefault()
    setId(Math.floor(Math.random()*10000))
    setMyArray([...myArray,{task,description, priority, id, complete}])
    console.log(5454);
    // localStorage.setItem("todos",JSON.stringify(myArray))  
})


useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(myArray))
  }, [myArray])
useEffect(() => {

    let storedTodos = JSON.parse(localStorage.getItem('todos')||'[]');
    setTodos(storedTodos);   

  }, [myArray]);
  let deleteTask = (id)=>{
    setMyArray(myArray.filter((item)=> item.id !==id))
} 
let completeTask = (id)=>{
    // setMyArray(myArray.map(myArray.complete => myArray.complete === true))
}
 
    return (
    <form id='main'>
      <nav>
        <h1>Write your To Do's</h1>
      </nav>
      <div id='input'>
        <span>
         <label htmlFor="">Task:</label>
            <input id='task' type="text" value={task} onChange= {handleTaskChange}/>
        </span>
        <span>
          <label >Description:</label>
            <textarea id='description' type="text" value={description} onChange= {handleDescriptionChange} />
        </span>
        <span>
         <label htmlFor="">Priority:</label>
            <input id='priority' type="text" value={priority} onChange={handlePriorityChange} />
        </span>
      </div>
      <div id='displayTasks'>
        <p>Uncompleted Tasks {JSON.stringify(myArray)}</p>
  console.log({myArray.id});
      <ul>
      {myArray.map(item => (
        <li id='list' key={item.id}>
         <span>Tasks: {item.task}</span>
         <span>Description: {item.description}</span> 
         <span>Priority: {item.priority}</span>
         <br />
         <button onClick={completeTask(item.id)}>Complete</button>
         <button id='delete' onClick = {()=> deleteTask(item.id)}>Delete</button>
          </li>
      ))}
</ul>  
    </div>
      <footer><button  onClick={addTask}>AddTask</button></footer>
    </form>
  )
}
