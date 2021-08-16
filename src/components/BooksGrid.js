import React from 'react';
import PropTypes from 'prop-types';
import Book, {BookPropTypes} from './Book';

const BooksGrid = props => (
  <ol className="books-grid">
    {props.books.map(book => (
      <li key={book.id}>
        <Book {...book} />
      </li>
    ))}
  </ol>
);

BooksGrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape(BookPropTypes).isRequired).isRequired
};

export default BooksGrid;
