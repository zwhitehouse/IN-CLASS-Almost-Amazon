import { signOut } from '../utils/auth';
import { getBooks, booksOnSale } from '../api/bookData';
import { showBooks } from '../pages/books';
import { getAuthors, getFavoriteAuthor } from '../api/authorData';
import { showAuthors } from '../pages/authors';

// navigation events
const navigationEvents = (user) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale(user.uid).then(showBooks);
    console.warn('CLICKED SALE BOOKS');
  });

  // ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks(user.uid).then(showBooks);
    console.warn('CLICKED ALL BOOKS');
  });

  // STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(user.uid).then(showAuthors);
    console.warn('CLICKED AUTHORS');
  });

  // FAVORITE AUTHORS
  document.querySelector('#favorite-authors').addEventListener('click', () => {
    getFavoriteAuthor(user.uid).then(showAuthors);
    console.warn('CLICKED FAVORITE AUTHOR');
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    // const searchValue = document.querySelector('#search').value.toLowerCase();
    // console.warn(searchValue);

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      const searchValue = document.querySelector('#search').value.toLowerCase();
      getBooks(user.uid).then((arr) => {
        const filteredBooks = arr.filter((item) => item.title.toLowerCase().includes(searchValue)
          || item.authorObject.first_name.toLowerCase().includes(searchValue)
          || item.authorObject.last_name.toLowerCase().includes(searchValue));
        showBooks(filteredBooks);
      });
      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
