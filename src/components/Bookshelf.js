import React from 'react';
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid';
import {BookPropTypes} from './Book';

const Bookshelf = props => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">
      {props.title}
    </h2>

    <div className="bookshelf-books">
      <BooksGrid books={props.books} />
    </div>
  </div>
);

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape(BookPropTypes).isRequired).isRequired
};

export default Bookshelf;
