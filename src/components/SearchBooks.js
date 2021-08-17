import React, {Component} from 'react';
import * as BooksAPI from '../apis/BooksAPI';
import SearchBooksBar from './SearchBooksBar';
import SearchBooksResult from './SearchBooksResult';

class SearchBooks extends Component {
  /**
   * @type {string}
   */
  lastRequestPosition = '0';
  requestControllers = {};
  search;

  state = {
    isSearching: false,
    query: '',
    searchBooks: []
  };

  componentWillUnmount() {
    clearTimeout(this.search);
    this.abortRequests();
  }

  abortRequests = ({exceptRequestPosition} = {}) => {
    Object.entries(this.requestControllers).forEach(([requestPosition, requestController]) => {
      if (!exceptRequestPosition || exceptRequestPosition !== requestPosition) {
        requestController.abort();
        delete this.requestControllers[requestPosition];
      }
    });
  };

  handleQueryChange = (query) => {
    if (query.length === 0) {
      this.abortRequests();
      this.lastRequestPosition = '0';
      this.setState({query: '', isSearching: false});
      return;
    }

    this.setState({query, isSearching: true});

    // Config request's controller
    const currentRequestPosition = String(Number(this.lastRequestPosition) + 1);
    this.lastRequestPosition = currentRequestPosition;

    const controller = new AbortController();
    this.requestControllers[currentRequestPosition] = controller;

    // Abort the previous pending requests
    clearTimeout(this.search);
    this.abortRequests({exceptRequestPosition: currentRequestPosition});

    // Search
    const search = () => {
      BooksAPI.search(query, {signal: controller.signal}).then(searchBooks => {
        // Delete the request's controller since we don't need it anymore
        delete this.requestControllers[currentRequestPosition];

        // Check if this is the last request
        if (this.lastRequestPosition === currentRequestPosition) {
          this.setState({
            searchBooks: searchBooks.error ? [] : searchBooks,
            isSearching: false
          });
        }
      }).catch(() => {
        // Catch network error
        // Check if this is the last request
        if (currentRequestPosition === this.lastRequestPosition) {
          this.search = setTimeout(search, 3000);
        }
      });
    };

    search();
  };

  render() {
    return (
      <div className="search-books">
        <SearchBooksBar
          query={this.state.query}
          onQueryChange={this.handleQueryChange}
        />

        {this.state.query.length > 0 && (
          <SearchBooksResult
            isSearching={this.state.isSearching}
            books={this.state.searchBooks.map(searchBook => ({
              ...searchBook,
              shelf: (this.props.books.find(book => book.id === searchBook.id) || {}).shelf,
              onShelfChange: (shelf) => this.props.onShelfChange(searchBook, shelf)
            }))}
          />
        )}
      </div>
    );
  }
}

export default SearchBooks;
