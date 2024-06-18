const express = require("express");
// To import body Parser
// Here we can use const and var both
var bodyParser = require("body-parser");
//In order to access the host data we use body parser || Body parser is something that allows express to read the body and then parse it and convert it into json object/format so that the machine as well as we can understand it
//Database-using dataset from database from database js file after exporting
// Database
const database = require("./database");
//Inititialize the express

// initialize the express
const booky = express(); // <- instance of express
// We have to initialize the body Parser also
booky.use(bodyParser.urlencoded({extended: true})); // It basically precises that the request which your are parsing will contain in any kind of values
// You are allow to pass any kind of things that can be object, string and anything into your URl/request


// Make our code bug free and error free we are doing this
//This is for extra security
booky.use(bodyParser.json()); // If we want bodyParser should use json only

/*
ROUTE            / (root route)
Description      Get all the books
Access           PUBLIC
Parameter        NONE     // here we are fetching the all book so we don't need any parameter
Methods          GET
*/
//printing the books to check the server is working fine or not

booky.get("/", (req,res) => {
  return res.json({books:database.books});
});


/*
ROUTE            /is
Description      Get specific book on ISBN
Access           PUBLIC
Parameter        isbn   // we are the books based on isbn parameter
Methods          GET
*/

// "/is" - it is used because based on "is" number we are redirected to some page "is" mean ISBN number
 // like on amazon if we click on footwear then we are directed to footwear section of particular brand example amazon/footwear/that footwear
// here "/is/" isbn number is going to change || anything that is we put colon :isbn

booky.get("/is/:isbn",(req,res) => {              // this mean that getSpecificBook which is in the database and filter the all book based on isbn number which is eaquals to isbn passed in the parameter
  const getSpecificBook = database.books.filter(  //filter iterate through entire array of objects and here book is individual object and inside the individual object we are checking the condition
    (book) => book.ISBN === req.params.isbn       // params iterate through the parameter and find what is the next value in isbn
  )
  if(getSpecificBook.length === 0) {             // if the length of te array is empty then return res.json and its content
                                                                                 // req.params.isbn gives isbn number of which i have searched and it dynamically changing
    return res.json({error:`No book found for the ISBN of ${req.params.isbn}`}) // req.params.isbn iterate through the request parameter and it just check the isbn things
  }                                 // Always use back tick when you have some dynamic parameter which is changing
  // if the condition is not satisfied
  return res.json({book:getSpecificBook});
});


/*
ROUTE            / /c
Description      Get specific book on category
Access           PUBLIC
Parameter        category   // we are the books based on isbn parameter
Methods          GET
*/


booky.get("/c/:category", (req,res) => {       // here we are filtering the books based on the category
  const getSpecificBook = database.books.filter(
    //Going to individual books and include method goes through entire array and checks
    (book) => book.category.includes(req.params.category)  // .includes() it basically goes and iterate through your entire category if that category includes some parameter in inside the ( ) checks in database.js then const book and then in category and iterate through it and checks whether it will includes particular parameter passed inside the include() or not
  )                                                       // req.params checks whether the category parameter is there or not in book section
  if(getSpecificBook.length === 0) {                 // if the length of te array is empty then return res.json and its content
    return res.json({error:`No book found for the category of ${req.params.category}`})
  }

  return res.json({book:getSpecificBook});
});                      // if it has that category then our filter method returns a new array after filtering porocess


/*
ROUTE            / /l
Description      Get specific book on category
Access           PUBLIC
Parameter        category   // we are the books based on isbn parameter
Methods          GET
*/


booky.get("/l/:language", (req,res) => {
  const getSpecificBook = database.books.filter(
    //Going to individual books and include method goes through entire array and checks
    (book) => book.language.includes(req.params.language)
  )
  if(getSpecificBook.length === 0) {
    return res.json({error:`No book found for the category of ${req.params.language}`})
  }

  return res.json({book:getSpecificBook});
});

booky.get("/t/:title",(req,res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.title.includes(req.params.title)
  )
  if(getSpecificBook.length === 0) {
    return res.json({error:`No book found of having title ${req.params.title}`})
  }
  return res.json({book:getSpecificBook});
});


/*
ROUTE            /author
Description      Get all authors
Access           PUBLIC
Parameter        None
Methods          GET
*/

// To get all the author
booky.get("/author", (req,res) => {
  return res.json({author:database.author});
});


/*
ROUTE            /author/id
Description      Get all authors based on id
Access           PUBLIC
Parameter        id
Methods          GET
*/

// To getSpecificAuthor
booky.get("/author/:id",(req,res) => {
  const getSpecificAuthor = database.author.filter(
    (author) => author.id ==  req.params.id
  )
  if(getSpecificAuthor.length === 0) {
    return res.json({error:`No book found for the Id of ${req.params.id}`})
  }
  return res.json({book:getSpecificAuthor});
});


/*
ROUTE            /author/book
Description      Get all authors based on book
Access           PUBLIC
Parameter        isbn
Methods          GET
*/


booky.get("/author/book/:isbn",(req,res) => {
  const getSpecificAuthor = database.author.filter(
    (author) => author.books.includes(req.params.isbn)
  );
  if(getSpecificAuthor.length === 0) {
    return res.json({
      error:`No author found for the book of ${req.params.isbn}`});
  }
  return res.json({authors: getSpecificAuthor});
});

booky.get("/pub",(req,res) => {
  return res.json({publications:database.publication});
});

/*
ROUTE            /publication
Description      Get all authors based on id
Access           PUBLIC
Parameter        id
Methods          GET
*/


booky.get("/pub/books/:id", (req,res) => {
  const getSpecificPublication = database.publication.filter(
    (publication) => publication.id == req.params.id
  );
  if(getSpecificPublication.length === 0) {
    return res.json({error:`No book found of this ${req.params.id} publictaion id`});
  }
  return res.json({publication:getSpecificPublication});
});


booky.get("/pub/books/:isbn",(req,res) => {
  const getSpecificPublication = database.publication.filter(
    (publication) => publication.books.isbn === req.params.isbn
  )
  if(getSpecificBook.length === 0) {
    return res.json({error:`No book found of isbn ${req.params.isbn} `})
  }
  return res.json({Books:getSpecificAuthor});
});

//POST POST POST POST POST POST POST POST POST POST POST POST POST

/*
ROUTE            /book/new
Description      ADD NEW BOOKS
Access           PUBLIC
Parameter        None
Methods          POST
*/

booky.post("/book/new", (req,res) => {
  // creating const newBook and inside it we are storing the body of the request (a new book we are trying to pass)
//This is newBook we aere try to pass
  const newBook = req.body; // It will fetch the body of our request
  //After this we push the NEW thing into our database
  database.books.push(newBook);
  //To return our response in json format
  return res.json({updatedBooks: database.books});
});

/*
ROUTE            /author/new
Description      ADD NEW Authors
Access           PUBLIC
Parameter        None
Methods          POST
*/

booky.post("/author/new", (req,res) => {
  const newAuthor = req.body;
  database.author.push(newAuthor);
  return res.json(database.author);
});

/*
ROUTE            /pub/new
Description      ADD NEW Publication
Access           PUBLIC
Parameter        None
Methods          POST
*/

booky.post("/pub/new", (req,res) => {
  const newPublication = req.body;
  database.publication.push(newPublication);
  return res.json(database.publication);
});

/*
ROUTE            /publication/update/book
Description      Update or add new the Publication
Access           PUBLIC
Parameter        isbn
Methods          PUT
*/

/* inside postman we are passing
{
  "pubId":2;
}
*/
// Logic- If this pubId is matching with the Id which we are passing then we will push our isbn number into the books of that particular id and then the request move to books database and checks the passed isbn in parameter which is present in the books database
booky.put("/publication/update/book/:isbn", (req,res) => {
  // Update the publication database
  database.publication.forEach((pub) => { // we are traversing through the each of the publication
    if(pub.id === req.body.pubId) {  // we are checking if the pub.id === the id which are we are passing in the req or url
// Then whatever the publication is there we want the book with this isbn should be pushed
      return pub.books.push(req.params.isbn);
    }
  });
// we are doing two different thing simultaneously matching pubId and finding book based on isbn
  //Update the book database
  database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn) {  // This statement means this particular isbn is equal to the isbn passed in parameter
      book.publication = req.body.pubId; // Now we are assuming each book is printed by one publication
      return; // we are ruturning and stopping the program peacefully without any return
    }

  });
  //we are rturning something in JSON format to see whether it is running or not
  return res.json(
    {
      books: database.books,
      publications: database.publication,
      message: "Successfully updated publications"
    }
  );
});


/******** DELETE *******/

/*
ROUTE            /book/delete
Description      Delete a book
Access           PUBLIC
Parameter        isbn
Methods          DELETE
*/

booky.delete("/book/delete/:isbn",(req,res) => {
  // Whichever book does not match with isbn, just send it to an updatedBookDatabase array
  // and rest will be filtered out
  const updatedBookDatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn  // we are storing the all book except the book which matches the isbn
  )
  database.books = updatedBookDatabase;  // we are updating with new array
  return res.json({books: database.books});
});

/*
ROUTE            /author/delete
Description      Delete an author
Access           PUBLIC
Parameter        id
Methods          DELETE
*/

booky.delete("/author/delete/:id", (req,res) => {
  const updatedAuthorDatabase = database.author.filter(
    (author) => author.id !== req.params.id
  )
  database.author = updatedAuthorDatabase;
  return res.json({author:database.authors});
});

/*
ROUTE            /book/delete/author
Description      Delete an author
Access           PUBLIC
Parameter        isbn, authorId
Methods          DELETE
*/

booky.delete("/book/delete/author/:isbn/:authorId",(req,res) => {
  //update the book Database
  database.books.forEach((book) => {  // Iterating through each item
    if(book.ISBN === req.params.isbn) { // we are checking the book with isbn
      const newAuthorList = book.author.filter(
        (eachAuthor) => eachAuthor !== parseInt(req.params.authorId) // using parseInt is good practice to avoid string-integer conflict
      );
      book.author = newAuthorList;   // updating the array
      return;
    }
  });

  //Update the author database
  database.author.forEach((eachAuthor) => {
    if(eachAuthor.id === parseInt(req.params.authorId)) {
      const newBookList = eachAuthor.books.filter(
        (book) => book !== req.params.isbn
      );
      eachAuthor.books = newBookList;
      return;
    }
  });

  return res.json({
    book:database.books,
    author:database.author,
    message:"Author has been deleted Successfully!!!"
  }); // one book is also deleted and only secretBook will be in the database
});


booky.listen(3000,() => {
  console.log("server is up and running");
});
