import React from 'react'


const Search = props => {
  return (
    <input
      onChange={({ target: { value } }) => props.search(value)}
      type="text"
      placeholder="Поиск задачи..."
    />
  );
};
  
    

export default Search