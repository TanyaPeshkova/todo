import React, { Component } from "react";
import { BrowserRouter, Link,  Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlusSquare } from "@fortawesome/free-regular-svg-icons";

import Sort from "./Sort";
import Header from "./Header";
import { getTodos } from "./data";
import NotFound from "./NotFound";
import Detail from "./Detail";
import './app.scss'


class App extends Component {
    constructor() {
        super()
         this.state = {
    todos: getTodos(),
    filtered: [],
    inputVal: '',
    currentPage: 1,
    todosPerPage: 3,
    i:0
  };
  this.handleClick = this.handleClick.bind(this);

}


handleClick(event) {
  this.setState({
    currentPage: Number(event.target.id)
  });
}


  search = search => {
    let currentTodos = [];
    let newList = [];
    if (search !== "") {
      currentTodos = this.state.todos;
      newList = currentTodos.filter(todo => {
        const lc = todo.title.toLowerCase();
        const filter = search.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.state.todos;
    }
    this.setState({
      filtered: newList
    });
  };

  filAll = () => {
    this.setState({
      filtered: [...this.state.todos]
    });
  }

  filActive = () => {
    this.setState({
      filtered: this.state.todos.filter(todo => !todo.completed)
    });
  }

  filComplete = () => {
    this.setState({
      filtered: this.state.todos.filter(todo => todo.completed)
    });
  }

  componentDidMount() {
    this.setState({
      filtered: this.state.todos
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.todos
    });
  }



  addTodo = title => {
    const newTodo = {
        title: this.state.inputVal,
        completed: false,
        owner: this.state.todos.length + 1,
        description: " ",
        created_at: new Date().toString(),
        ending_at:  new Date().toString(),
       } ;
    if (!this.state.inputVal) return   
    this.setState({ filtered: [...this.state.filtered, newTodo],
        todos: [...this.state.filtered, newTodo],
    inputVal: '' });

  };


  handleChange(e) {
    this.setState({
      inputVal: e.target.value
    })
  }

  deleteItem(title,i) {
    const data = this.state.todos.filter(element => element.title !== title);
    this.setState({
      filtered: data,
      todos: data,
      i: this.state.i+1
    })
  }

  completeTask(title) {
    const TodoList = []
    this.state.todos.forEach((element, index) => {
      if (element.title === title) {
        const item = this.state.todos[index]
        TodoList.push(Object.assign({}, item, {completed: item.completed === false ? true : false}))
        this.setState({
          filtered: TodoList,
          todos: TodoList
        })
      } else {
        TodoList.push(element)
      }
    })
  }
  


  render() {
    const todo = {todo: this.state.todos}
    const i = {i: this.state.i }
    const { filtered, currentPage, todosPerPage } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = filtered.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderTodos = currentTodos.map((todo, index) => {
  return  <tr key={index} >
     <td> <input type="checkbox" 
      checked={todo.completed === true} 
      onChange={this.completeTask.bind(this, todo.title)}
      /></td>
       <td> <Link to={`/detail/${todo.owner}`}> <span style={{textDecorationLine: todo.completed === false ? 'none' : 'line-through'}} 
          >{todo.title}</span></Link></td>
         
         <td>
          <button className="delete" onClick={this.deleteItem.bind(this, todo.title,i)} > <FontAwesomeIcon icon={faTrashAlt} /> </button></td>
        </tr>
        
      });
      const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filtered.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <button className="pag"
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </button>
      );
    });
    
    return (
  
      <div className="App">
       <div className="container">
        <input type="text" value={this.state.inputVal} onChange={this.handleChange.bind(this)} placeholder="Добавить дело"></input>
        <button className="addTodo" onClick={this.addTodo.bind(this)}><FontAwesomeIcon icon={faPlusSquare}/></button></div>
          <Header search={this.search} className="search"/>
          <Sort 
                  filAll={this.filAll}
                  filActive={this.filActive}
                  filComplete={this.filComplete}
                  />
                  
            

          <BrowserRouter><table>
         {renderTodos}<tr><td></td><tb>
         {renderPageNumbers}</tb><tb></tb></tr>
          </table>
          <Routes>
              <Route path="/"   /> 
              <Route path="/detail/:owner" element= {<Detail todo={todo}/>} />
              <Route path ='*' element = {<NotFound/>}/>
              </Routes>
          </BrowserRouter>  
          
         
        </div>
    );
  }
}


export default App