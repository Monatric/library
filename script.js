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

function BookCard(book) {
  const bookSection = document.createElement("section")
  bookSection.classList.add("book__card")

  const bookContainer = document.createElement("div")
  bookContainer.classList.add("book__container")

  const bookTitle = document.createElement("h3")
  bookTitle.classList.add("book-title")
  bookTitle.textContent = "Title: " + book.title

  const bookAuthor = document.createElement("p")
  bookAuthor.classList.add("book-author")
  bookAuthor.textContent = "Author: " + book.author

  const bookPages = document.createElement("p")
  bookPages.classList.add("book-pages")
  bookPages.textContent = "Pages: " + book.pages

  const bookReadStatus = document.createElement("p")
  bookReadStatus.classList.add("book-read-status")
  bookReadStatus.textContent = book.readStatus()

  bookSection.appendChild(bookContainer)
  bookContainer.appendChild(bookTitle)
  bookContainer.appendChild(bookAuthor)
  bookContainer.appendChild(bookPages)
  bookContainer.appendChild(bookReadStatus)

  this.fragment = document.createDocumentFragment()
  this.fragment.appendChild(bookSection)
}

function displayBookOnPage() {
  console.log(myLibrary)
  myLibrary.forEach((book) => {
    const bookCard = new BookCard(book)
    const libraryContainer = document.querySelector(".library__container")
    libraryContainer.appendChild(bookCard.fragment)
  })
}

displayBookOnPage()