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
  const bookSection = createBookElements(book)

  this.fragment = document.createDocumentFragment()
  this.fragment.appendChild(bookSection)
}

function createBookElements(book) {
  const bookSection = document.createElement("section")
  bookSection.classList.add("book__card")
  bookSection.dataset.id = book.id

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

  const bookReadStatusCheckbox = document.createElement("input")
  bookReadStatusCheckbox.classList.add("book-read-status")
  bookReadStatusCheckbox.name = "book-read-status"
  bookReadStatusCheckbox.type = "checkbox"
  book.isRead ? bookReadStatusCheckbox.checked = true : bookReadStatusCheckbox.checked = false
  bookReadStatusCheckbox.addEventListener("click", (e) => {
    e.target.checked ? book.isRead = true : book.isRead = false
    bookReadStatusLabel.textContent = "Read Status: " + book.readStatus()
  })

  const bookReadStatusLabel = document.createElement("label")
  bookReadStatusLabel.textContent = "Read Status: " + book.readStatus()

  const bookDeleteBtn = document.createElement("button")
  bookDeleteBtn.classList.add("removeBtn")
  bookDeleteBtn.textContent = "Remove Book"
  bookDeleteBtn.dataset.id = book.id
  bookDeleteBtn.addEventListener("click", (e) => {
    const bookToBeDeleted = myLibrary.find((book) => book.id == e.target.dataset.id)
    const index = myLibrary.indexOf(bookToBeDeleted)
    myLibrary.splice(index, 1)
    bookSection.remove()
  })

  bookElements = [bookSection,
    bookContainer,
    bookTitle,
    bookAuthor,
    bookPages,
    bookReadStatusCheckbox,
    bookReadStatusLabel,
    bookDeleteBtn
  ]
  appendBookElements(...bookElements)

  return bookSection
}

// Appending HTML elements of a book card
function appendBookElements(section, container, ...bookDetails) {
  section.appendChild(container)
  for (const bookDetail of bookDetails) {
    container.appendChild(bookDetail)
  }
}

// Showing the books on the web view
function displayBooks() {
  const libraryContainer = document.querySelector(".library__container")
  // Start at the last book shown in the view to avoid
  // going through the entire array for displaying books
  const start_offset = libraryContainer.childElementCount
  for (let i = start_offset; i < myLibrary.length; i++) {
    const bookCard = new BookCard(myLibrary[i])
    libraryContainer.appendChild(bookCard.fragment)
  }
}

// Shows the dialog for adding books
const showDialog = document.querySelector("#showDialog")
const addBookDialog = document.querySelector("#addBookDialog")
const submitBtn = document.querySelector("#submitBtn")
const cancelBtn = document.querySelector("#cancelBtn")
const bookTitleInput = document.querySelector("#book[title]")
const addBookForm = document.getElementById("addBookForm")

showDialog.addEventListener("click", () => {
  addBookDialog.showModal()
})

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addBooksFromForm(event.target)
  displayBooks()
  addBookDialog.close()
})

function addBooksFromForm(form) {
  const formData = new FormData(form)
  const formValues = []
  for (let [key, value] of formData.entries()) {
    if (value == 'yes') {
      value = true
    } else if (value == 'no') {
      value = false
    }
    formValues.push(value)
  }
  addBookToLibrary(...formValues)
}

addBookDialog.addEventListener("close", (e) => {

})

cancelBtn.addEventListener("click", () => {
  addBookDialog.close()
})



// Display books on page load
window.onload = function () {
  displayBooks()
}
