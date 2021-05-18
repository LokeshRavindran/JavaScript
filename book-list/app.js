// submit button
const submit = document.querySelector("#add-form").lastElementChild;

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBook(book) {
    let bookList;
    if (localStorage.getItem("books") === null) {
      bookList = [];
    } else {
      bookList = JSON.parse(localStorage.getItem("books"));
    }
    const trToBePlaced = document.querySelector("#section-2").children[0];

    // create a tr element
    const tr = document.createElement("tr");

    tr.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a><i class="fas fa-times"></i></a></td>
  `;
    trToBePlaced.append(tr);
    bookList.push(book);
    localStorage.setItem("books", JSON.stringify(bookList));
  }

  displayBooks() {
    let bookList;
    if (localStorage.getItem("books") != null) {
      bookList = JSON.parse(localStorage.getItem("books"));
      bookList.forEach(function (book) {
        const trToBePlaced = document.querySelector("#section-2").children[0];

        // create a tr element
        const tr = document.createElement("tr");

        tr.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a><i class="fas fa-times"></i></a></td>
                        `;
        trToBePlaced.append(tr);
      });
    }
  }

  deleteBook(xMark, index) {
    xMark.addEventListener("click", function () {
      let bookList = JSON.parse(localStorage.getItem("books"));
      bookList.splice(index, 1);
      localStorage.setItem("books", JSON.stringify(bookList));
      location.reload();
    });
  }
}

// displaying already added books
const ui = new UI();
ui.displayBooks();

// submiting a new book
submit.addEventListener("click", function (e) {
  // ui fields
  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const isbn = document.querySelector("#isbn");

  // field for success or failure
  let successFail = document.querySelector("#section-1").children[1];

  if (title.value === "" || author.value === "" || isbn.value === "") {
    successFail.innerHTML = `Please enter all the details  <i class="fas fa-poo"></i>`;
    successFail.setAttribute("id", "fail");
    setTimeout(function () {
      successFail.removeAttribute("fail");
      successFail.setAttribute("id", "errorSuccess");
    }, 3000);
  } else {
    // creating new book object and adding it
    const book = new Book(title.value, author.value, isbn.value);
    ui.addBook(book);

    // success message
    successFail.innerHTML = `Book added  <i class="far fa-smile-wink"></i>`;
    successFail.removeAttribute("errorSuccess");
    successFail.setAttribute("id", "success");

    setTimeout(function () {
      successFail.removeAttribute("success");
      successFail.setAttribute("id", "errorSuccess");
      location.reload();
    }, 3000);

    title.value = "";
    author.value = "";
    isbn.value = "";
  }

  e.preventDefault();
});

// delete particular book
if (localStorage.getItem("books") != null) {
  const deleteElement = document.querySelector("#section-2").children[0];
  const delBook = deleteElement.querySelectorAll("i");
  delBook.forEach(function (xMark, index) {
    ui.deleteBook(xMark, index);
  });
}
