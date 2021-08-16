import React from 'react';
import PropTypes from 'prop-types';
import {BookPropTypes} from './Book';
import Bookshelf from './Bookshelf';

const ListBooksContent = props => {
  const bookshelves = [
    {
      type: 'currentlyReading',
      title: 'Currently Reading'
    },
    {
      type: 'wantToRead',
      title: 'Want to Read'
    },
    {
      type: 'read',
      title: 'Read'
    }
  ];

  return (
    <div className="list-books-content">
      <div>
        {bookshelves.map(bookshelf => (
          <Bookshelf
            key={bookshelf.type}
            title={bookshelf.title}
            books={props.books.filter(book => book.shelf === bookshelf.type)}
          />
        ))}
      </div>
    </div>
  );
};

ListBooksContent.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape(BookPropTypes).isRequired).isRequired
};

export default ListBooksContent;
