let myLibrary = [];

function Book(title, author, pages, read) {
// Book constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
function addBookToLibrary(event) {
  // Prevent form submission
  event.preventDefault();

  // Get form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;
  // Get the error message elements
  var titleError = document.getElementById("titleError");
  var authorError = document.getElementById("authorError");
  var pagesError = document.getElementById("pagesError");

  // Reset error messages
  titleError.textContent = "";
  authorError.textContent = "";
  pagesError.textContent = "";
  // Validation: Check if the Title field is empty
  if (title.trim() === "") {
      titleError.textContent = "Title is required";
      titleError.style.color = "red";
      titleError.style.fontSize = "16px";
      return; // Exit the function without adding the book
  }
  // Validation: Check if the Title starts with a capital letter
  if (!/^[A-Z]/.test(title)) {
      titleError.textContent = "Title must start with a capital letter";
      authorError.style.color = "red";
      authorError.style.fontSize = "16px";
      return; // Exit the function without adding the book
  }
  // Validation: Check if the Author field is empty
  if (author.trim() === "") {
      authorError.textContent = "Author is required";
      pagesError.style.color = "red";
      pagesError.style.fontSize = "16px";
      return; // Exit the function without adding the book
  }
  // Validation: Check if the Author starts with a capital letter
  if (!/^[A-Z]/.test(author)) {
      authorError.textContent = "Author must start with a capital letter";
      return; // Exit the function without adding the book
  }
  // Validation: Check if the Pages field is empty or not a number
  if (pages.trim() === "" || isNaN(pages)) {
      pagesError.textContent = "Number of pages is required and must be a valid number";
      return; // Exit the function without adding the book
  }
  // Create new book object
  const book = new Book(title, author, pages, read);
  // Add book to library
  myLibrary.push(book);
  // Clear form values
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;
  // Render library
  renderLibrary();
}

// Create table to display library
function renderLibrary() {
  const tableBody = document.querySelector("#libraryTable tbody");
  tableBody.innerHTML = "";
// Loop through library array and display each book in a table row
  myLibrary.forEach((book, index) => {
    const row = document.createElement("tr");
    const titleCell = document.createElement("td");
    titleCell.textContent = book.title;
    row.appendChild(titleCell);
    titleCell.style.backgroundColor = "#4CAF50";
    titleCell.style.color = "#FFF";
    const authorCell = document.createElement("td");
    authorCell.textContent = book.author;
    row.appendChild(authorCell);
    const pagesCell = document.createElement("td");
    pagesCell.textContent = book.pages;
    row.appendChild(pagesCell);
    pagesCell.style.width = "90px";
    const readCell = document.createElement("td");
    readCell.textContent = book.read ? "Yes" : "No";
    row.appendChild(readCell);
    readCell.style.width = "90px";
    const actionCell = document.createElement("td");
    row.appendChild(actionCell);
    actionCell.style.width = "91px";
    actionCell.style.textAlign = "center";
    // Create read slider to toggle read as Yes | No
    const readSlider = document.createElement("input");
    readSlider.type = "range";
    readSlider.min = "0";
    readSlider.max = "1";
    readSlider.value = book.read ? "1" : "0";
    readSlider.setAttribute("data-index", index);
    readSlider.addEventListener("input", toggleRead);
    readSlider.style.width = "40px";
    readSlider.style.height = "10px";
    readSlider.style.backgroundColor = "#8bc34a";
    readSlider.style.border = "1px solid #8bc34a";
    readSlider.style.outline = "1px solid #8bc34a";
    readSlider.style.borderRadius = "5px";
    readSlider.style.marginLeft = "15px";
    readCell.appendChild(readSlider);
    // Create delete button to enable book removal
// Create delete button to enable book removal
  const deleteBook = document.createElement("button");
  deleteBook.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBook.classList.add("delete-button");
  deleteBook.dataset.index = index; 
  deleteBook.addEventListener("click", removeBook);
  actionCell.appendChild(deleteBook);
  deleteBook.style.fontSize = "27px";
  deleteBook.style.border = "none";
  deleteBook.style.backgroundColor = "transparent";
  deleteBook.style.color = "#0d98ba";
   //Append row to table body
    tableBody.appendChild(row);
  });
  // Update total book count
  const totalBooks = getTotalBooks();
  document.getElementById("totalBooks").textContent = `${totalBooks}`;
  // Update total books read count
  const totalBooksRead = getTotalBooksRead();
  document.getElementById("totalBooksRead").textContent = `${totalBooksRead}`;
}
// Toggle form visibility
function toggleForm() {
  const form = document.getElementById("bookForm");
  const toggleButtonText = document.querySelector(".newBook").textContent;
  form.classList.toggle("show-form");  
  if (toggleButtonText === "ADD NEW BOOK") {
    document.querySelector(".newBook").textContent = "STOP ADDING";
  } else if (toggleButtonText === "STOP ADDING") {
    document.querySelector(".newBook").textContent = "ADD NEW BOOK";
  }
}
// Remove book from library
function removeBook(event) {
  const index = event.target.parentNode.getAttribute("data-index");
  myLibrary.splice(index, 1);
  renderLibrary();
}
// Toggle read status
function toggleRead(event) {
  const index = event.target.getAttribute("data-index");
  const book = myLibrary[index];
  book.read = event.target.value === "1";
  renderLibrary();
}
// Calculate total number of books in library
function getTotalBooks() {
  return myLibrary.length;
}
// Calculate total number of books read
function getTotalBooksRead() {
  return myLibrary.filter((book) => book.read).length;
}
// Manual addition of some books to the library for demonstration purposes
const book1 = new Book("Managing Timber Exploitation with Decision Support Systems (DSS)", "Dr. Kato Samuel Namuene", 567, true);
myLibrary.push(book1);
const book2 = new Book("Forest Informatics with JavaScript", "Dr. Kato Samuel Namuene", 340, false);
myLibrary.push(book2);
const book3 = new Book("HTML and CSS for Forest Informaticians", "Dr. Kato Samuel Namuene", 405, false);
myLibrary.push(book3);
// Initial rendering of the library
renderLibrary();
