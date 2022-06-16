import React  from "react";
import {useParams} from 'react-router-dom';
import './app.scss'




function Detail(props){
  const params = useParams();
  const prodId = params.owner ;
  const todos = props.todo.todo.filter(element => element.owner == prodId)[0];  
  if (todos && todos.completed === false) {
  return (<div>
    <h1>Задача</h1>
    <h2>{todos.title}</h2>
    <p>Описание:{todos.description}</p>
    <p>Создана:{todos.created_at}</p>
    <p>Заканчивается:{todos.ending_at}</p>
    <p> Статус: Активная </p>
  </div>) } else if (todos && todos.completed === true){
   return (<div>
    <h1>Задача</h1>
    <h2>{todos.title}</h2>
    <p>Описание:{todos.description}</p>
    <p>Создана:{todos.created_at}</p>
    <p>Заканчивается:{todos.ending_at}</p>
    <p> Статус: Завершенная </p> </div>)

} else{ 
    return <div>
      <h1>Задача не найдена</h1>
    </div>
  } 
  
}

export default Detail 