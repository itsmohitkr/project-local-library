  function getTotalBooksCount(books) {
    return books.length;
  }

  function getTotalAccountsCount(accounts) {
    return accounts.length;
  }

  function getBooksBorrowedCount(books) {
    let count = 0;
    books.forEach((book) => {
      book.borrows.forEach((item) => {
        if (item.returned === false) {
          count++;
        }
      })
    })
    return count;
  }

  function genrecount(genreArray, currentgenre) {
    let result = {};
    const filteredGenres = genreArray.filter((genre) => genre === currentgenre);
    const totalGenreCount = filteredGenres.length;
    result.name = currentgenre;
    result.count = totalGenreCount;
    return result;
  }

  function getMostCommonGenres(books) {
    const result = [];
    const genreArray = books.map((book) => book.genre);
    const genreObject = books.map((book) => genrecount(genreArray, book.genre));
    // console.log(genreObject)
    for (let i = 0; i < genreObject.length; i++) {
      if (result.includes(genreObject[i]) === false && result.length < 5) {
        result.push(genreObject[i]);
      }
    }

    result.sort((objA, objB) => objB.count - objA.count);
    return result;
  }

  function getMostPopularBooks(books) {
    const result = [];
    const finalans = [];
    books.forEach((book) => {
      const obj = {};
      obj.name = book.title;
      obj.count = book.borrows.length;
      result.push(obj);
    })
    result.sort((item1, item2) => item2.count - item1.count);
    for (let i = 0; i < result.length; i++) {
      if (finalans.length < 5) {
        finalans.push(result[i]);
      }
    }
    return finalans;
  }
function addBooksToEachAuthor(authors, books) {
  let returnArr = [];
    for (let i = 0; i < authors.length; i++) {
      let currentAuthor = authors[i];
      let filtered = books.filter((book) => book.authorId === currentAuthor.id);
      console.log(filtered);
      currentAuthor.writtenBooks = filtered;
      returnArr.push(currentAuthor);
    }
    return returnArr;
  }
function makeNewAuthorObj(author) {
  let newObj = {};
  let borrowCounts = [];
  for (let i = 0; i < author.writtenBooks.length; i++) {
    borrowCounts.push(author.writtenBooks[i].borrows.length);
  }
  const totalCount = borrowCounts.reduce((acc, count) => acc + count, 0);
  newObj.name = `${author.name.first} ${author.name.last}`;
  newObj.count = totalCount;
  return newObj;
}

  function getMostPopularAuthors(books, authors) {
    let resultArr = [];
    const authorsAndTheirBooks = addBooksToEachAuthor(authors, books);
    console.log(authorsAndTheirBooks)
    const complete = authorsAndTheirBooks.map((author) =>
      makeNewAuthorObj(author)
    );
    // console.log(complete);
    complete.sort((authorA, authorB) => authorB.count - authorA.count);
        // console.log(complete);

    for (let i = 0; i < complete.length; i++) {
      if (resultArr.length < 5) {
        resultArr.push(complete[i]);
      }
    }
    return resultArr;
  }

  module.exports = {
    getTotalBooksCount,
    getTotalAccountsCount,
    getBooksBorrowedCount,
    getMostCommonGenres,
    getMostPopularBooks,
    getMostPopularAuthors,
  };
