const myLibrary = [];

// Book constructor and prototype methods
function Book(title, author, pages, isRead) {
  if (!new.target) {
    throw Error("You must use 'new' to call the constructor")
  }

  this.id = crypto.randomUUID();
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus()}`
}

Book.prototype.readStatus = function () {
  return this.isRead ? "Read already" : "Not read yet"
}

// Adding books to library
function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead)
  myLibrary.push(book)
}

// Initialized books, getting added into the library
const theHobbit = addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true)
const jojo = addBookToLibrary("JoJo's Bizarre Adventure", "Hirohiro Araki", 190, true)
const hxh = addBookToLibrary("Hunter X Hunter", "Yoshihiro Togashi", 148, true)
const steinsGate = addBookToLibrary("Steins;Gate", "Chiyomaru Shikura", 24, true)
const onePiece = addBookToLibrary("One Piece", "Eiichiro Oda", 1139, false)

// HTML constructor for a book card
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
  bookReadStatus.textContent = "Read Status: " + book.readStatus()

  appendBookElements(bookSection, bookContainer, bookTitle, bookAuthor, bookPages, bookReadStatus)

  this.fragment = document.createDocumentFragment()
  this.fragment.appendChild(bookSection)
}

// Appending HTML elements of a book card
function appendBookElements(section, container, ...bookDetails) {
  section.appendChild(container)
  for (const bookDetail of bookDetails) {
    container.appendChild(bookDetail)
  }
}

// Showing the books on the web view
function displayBookOnPage() {
  console.log(myLibrary)
  myLibrary.forEach((book) => {
    const bookCard = new BookCard(book)
    const libraryContainer = document.querySelector(".library__container")
    libraryContainer.appendChild(bookCard.fragment)
  })
}

displayBookOnPage()