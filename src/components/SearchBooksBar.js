import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const SearchBooksBar = props => {
  const handleChange = (event) => {
    props.onQueryChange(event.target.value);
  };

  return (
    <div className="search-books-bar">
      <Link className="close-search" to="/">
        Close
      </Link>

      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title or author"
          value={props.query}
          onChange={handleChange}
          autoFocus
        />
      </div>
    </div>
  );
};

SearchBooksBar.propTypes = {
  query: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired
};

export default SearchBooksBar;
