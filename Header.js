import React, { Component } from "react";
import './app.scss'



class Header extends Component {
  state = {
    value: ""
  };

  render() {
    return (
      <div className="header">
        <input
          onChange={e => this.props.search(e.target.value)}
          type="text"
          placeholder="Поиск..."
        />
      </div>
    );
  }
}

export default Header;