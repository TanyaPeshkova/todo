import React, { Component } from "react";
import './app.scss'

class Sort extends Component {
  state = {
    value: "",

  };
  render() {
    return (
      <div className="header">
        <button  onClick={e => this.props.filActive(e)}>Активные</button>
        <button  onClick={e => this.props.filComplete(e)}>Завершенные</button>
        <button  onClick={e => this.props.filAll(e)}>Все</button>
      </div>
    );
  }

}


export default Sort;