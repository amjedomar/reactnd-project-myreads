import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import ListBooks from './components/ListBooks';
import SearchBooks from './components/SearchBooks';
import * as BooksAPI from './apis/BooksAPI';

class BooksApp extends React.Component {
  state = {
    books: [],
    isLoading: true
  };

  componentDidMount() {
    const getAll = () => {
      BooksAPI.getAll().then(books => {
        this.setState({
          books,
          isLoading: false
        });
      }).catch(() => {
        setTimeout(getAll, 3000);
      });
    };

    getAll();
  }

  handleShelfChange = (book, shelf) => {
    this.setState(prevState => {
      const books = [...prevState.books];
      const bookIndex = books.findIndex(b => b.id === book.id);
      if (bookIndex > -1) books.splice(bookIndex, 1);
      if (shelf !== 'none') books.push({...book, shelf});
      return { books };
    });

    const update = () => {
      BooksAPI.update(book, shelf).catch(() => {
        setTimeout(update, 3000);
      });
    };

    update();
  };

  render() {
    let content = <p className="subtitle">Loading...</p>;

    if (!this.state.isLoading) {
      content = (
        <>
          <Route exact path="/" render={() => (
            <ListBooks books={this.state.books} onShelfChange={this.handleShelfChange} />
          )} />

          <Route exact path="/search" render={() => (
            <SearchBooks books={this.state.books} onShelfChange={this.handleShelfChange} />
          )} />
        </>
      );
    }

    return (
      <div className="app">
        {content}
      </div>
    );
  }
}

export default BooksApp;
