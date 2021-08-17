import React from 'react';
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid';
import {BookPropTypes} from './Book';

const SearchBooksResult = props => {
  let content;
  if (props.isSearching) {
    content = <p className="subtitle">Searching...</p>;
  } else if (props.books.length === 0) {
    content = <p className="subtitle">Sorry, there isn't any book that matches your search query</p>;
  } else {
    content = <BooksGrid books={props.books} />;
  }

  return (
    <div className="search-books-results">
      {content}
    </div>
  );
};

SearchBooksResult.propTypes = {
  isSearching: PropTypes.bool.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape(BookPropTypes).isRequired).isRequired
};

export default SearchBooksResult;
