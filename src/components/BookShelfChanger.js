import React from 'react';
import PropTypes from 'prop-types';

const BookShelfChanger = props => {
  const handleChange = (event) => {
    if (typeof props.onShelfChange === 'function') {
      props.onShelfChange(event.target.value);
    }
  };

  return (
    <div className="book-shelf-changer">
      <select value={props.shelf} onChange={handleChange}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

BookShelfChanger.propTypes = {
  shelf: PropTypes.string.isRequired,
  onShelfChange: PropTypes.func
};

export default BookShelfChanger;
