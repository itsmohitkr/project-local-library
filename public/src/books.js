function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  return books.find(book => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  const result = [];
  const borrowed = books.filter((book) => book.borrows[0].returned === false);
  const returned = books.filter((book) => book.borrows[0].returned === true);

  result.push(borrowed, returned)

  return result;
}

function getBorrowersForBook(book, accounts) {
  const borrowArray = book.borrows;
  const result = [];
  borrowArray.forEach((obj) => {
    const id = obj.id;
    const acc = accounts.find((account) => account.id === id);
    acc.returned = obj.returned;
    if (result.length < 10) {
      result.push(acc);
    }
  })
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
