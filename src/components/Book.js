import React from 'react';
import PropTypes from 'prop-types';
import BookSelfChanger from './BookShelfChanger';

const Book = props => {
  let backgroundImage;
  if (props.imageLinks && props.imageLinks.smallThumbnail) {
    backgroundImage = `url("${props.imageLinks.smallThumbnail}")`;
  }

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{width: 128, height: 192, backgroundImage}}
        />

        <BookSelfChanger
          shelf={props.shelf}
          onShelfChange={props.onShelfChange}
        />
      </div>

      <div className="book-title">
        {props.title}
      </div>

      {props.authors && (
        <div className="book-authors">
          {props.authors.join(' - ')}
        </div>
      )}
    </div>
  );
};

export const BookPropTypes = {
  title: PropTypes.string.isRequired,
  shelf: PropTypes.string,
  imageLinks: PropTypes.shape({
    smallThumbnail: PropTypes.string
  }),
  authors: PropTypes.arrayOf(PropTypes.string.isRequired),
  onShelfChange: PropTypes.func
};

Book.propTypes = BookPropTypes;

Book.defaultProps = {
  shelf: 'none'
};

export default Book;
