function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last < accountB.name.last ? -1 : 1
  )
}

function getTotalNumberOfBorrows(account, books) {
  const id = account.id;
  let total = 0;
  books.forEach((book) => book.borrows.forEach((item) => {
    if (item.id === id) {
      total++;
    }
  }))
  return total;
}
//It returns an array of book objects, including author information, that represents all books _currently checked out_ by the given account
function getBooksPossessedByAccount(account, books, authors) {
  let result = [];

  books.forEach((book) => {
    let borrowed = book.borrows;
    if (borrowed.find((borrow) =>
        borrow.id === account.id &&
        !borrow.returned)) {
      result.push(book);
    }
  });

  result.forEach((book) => {
    let author = authors.find((author) => author.id === book.authorId);
    book.author = author;
  })
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
