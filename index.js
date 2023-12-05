const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json);
const axios = require("axios");

//authentication
const isAuthenticated = (req, res, next) => {
  const userAuthenticaed = true;
  if (userAuthenticaed) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
const booklist = [
  {
    id: 1,
    ISBN: 1524003,
    Author: "Sandip",
    Title: "Hello World",
    BookReview: "Awesome",
  },
  {
    id: 2,
    ISBN: 1224003,
    Author: "Suman",
    Title: "Hello Nepal",
    BookReview: "Good",
  },
  {
    id: 3,
    ISBN: 11114003,
    Author: "Ram",
    Title: "The World",
    BookReview: "Bad",
  },
];
const userList = [{ username: "Ram", password: "123" }];
// task 2 get booksaccordingtoisbn
app.get("/api/books/:ISBN", (req, res) => {
  const ISBN = req.params.ISBN;
  const book = booklist.find((b) => {
    b.ISBN === ISBN;
  });
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: "book not found" });
  }
});
// task 1 get all books
app.get("/api/books", (req, res) => {
  res.json(booklist);
});

//task 3 get all books by author
app.get("/api/books/:author", (req, res) => {
  const author = req.params.author;
  const BookByAuthor = booklist.filter((b) => b.Author === author);
  res.json(BookByAuthor);
});

//task4 get all books based on title
app.get("/api/books/:title", (req, res) => {
  const title = req.params.title;
  const BookByTitle = booklist.filter((b) => b.Title === title);
  res.json(BookByTitle);
});

//task5 get book review
app.get("/api/books/:isbn/review", (req, res) => {
  const isbn = req.params.isbn;
  const Book = booklist.find((b) => b.ISBN === isbn);
  if (Book) {
    res.json({ review: Book.BookReview });
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

//task6 register a user
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
});

//task7  login as register user
app.post("/api/login", (req, res) => {
  const { userName, Password } = req.body;
  const user = userList.find((u) => u.username === userName);
  if (user) {
    res.json({ message: "Login Successful" });
  } else {
    res.status(401).json({ error: "Invalid username or Password" });
  }
});

//task8 add or modify the review for the registered user
app.put("/api/books/:isbn/review", isAuthenticated, (req, res) => {
  const isbn = req.params.isbn;
  const { BookReview } = req.body;
  const book = booklist.find((b) => b.ISBN === isbn);
  if (book) {
    const userReview = book.review.find((r) => r.userName === username);
    if (userReview) {
      userReview.BookReview = BookReview;
    } else {
      book.review.push({ username, BookReview });
    }
    res.json({ Message: "Review added/modified successfully" });
  } else {
    res.status(401).json({ error: "book not found" });
  }
});

//task9 delete the review fot the registered user
app.delete("/api/books/:isbn/review", isAuthenticated, (req, res) => {
  const isbn = req.params.isbn;
  const book = booklist.find((b) => b.ISBN === isbn);
  if (book) {
    const BookReviewToDelete = req.body.reviewID;
    const userReview = book.reviews.find(
      (r) => r.username === username && r.reviewID === BookReviewToDelete
    );

    if (userReview) {
      // If the user has added a review, delete it
      book.reviews = book.reviews.filter(
        (r) => r.reviewID !== reviewIDToRemove
      );
      res.json({ message: "Review deleted successfully" });
    } else {
      res
        .status(404)
        .json({ error: "Review not found for the specified user or reviewID" });
    }
  } else {
    res.status(401).json({ error: "book not found" });
  }
});

//task10 get all book using async callback functions
async function getAllBooks() {
  try {
    const Response = await axios.get(`http://localhost300/api/books`);
    return Response.data;
  } catch (error) {
    console.error("Error during fetching books:", error.message);
  }
}

// Task 11: Search by ISBN – Using Promises
function searchByISBN(isbn) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`http://localhost300/api/books ${isbn}`);
      resolve(response.data);
    } catch (error) {
      console.error("Error searching by ISBN:", error.message);
      reject(error);
    }
  });
}

// Task 12: Search by Author
async function searchByAuthor(author) {
  try {
    const response = await axios.get(`http://localhost300/api/books ${author}`);
    return response.data;
  } catch (error) {
    console.error("Error searching by Author:", error.message);
    throw error;
  }
}

// Task 13: Search by Title
async function searchByTitle(title) {
  try {
    const response = await axios.get(`${apiUrl}/title/${title}`);
    return response.data;
  } catch (error) {
    console.error("Error searching by Title:", error.message);
    throw error;
  }
}
//port
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
