const myLibrary = [];

function Book(title, author, pages, isRead) {
  if (!new.target) {
    throw Error("You must use 'new' to call the constructor")
  }

  this.id = crypto.randomUUID();
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus()}`
  }

  this.readStatus = function () {
    return this.isRead ? "read already" : "not read yet"
  }
}

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead)
  myLibrary.push(book)
}

const theHobbit = addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true)
console.log(myLibrary)