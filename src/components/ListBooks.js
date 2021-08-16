import React from 'react';
import PropTypes from 'prop-types';
import {BookPropTypes} from './Book';
import ListBooksTitle from './ListBooksTitle';
import ListBooksContent from './ListBooksContent';
import OpenSearchBooks from './OpenSearchBooks';

const ListBooks = props => (
  <div className="list-books">
    <ListBooksTitle />

    <ListBooksContent
      books={props.books.map(book => ({
        ...book,
        onShelfChange: (shelf) => props.onShelfChange(book, shelf)
      }))}
    />

    <OpenSearchBooks />
  </div>
);

ListBooks.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape(BookPropTypes).isRequired).isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default ListBooks;
