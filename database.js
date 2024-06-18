const books = [
  {
    ISBN: "12345book",
    title: "Tesla!!!",
    pubDate: "2024-10-05",
    language: ["en","hin"],
    numPage: 250,
    author: [1,2],
    publication: [1],
    category: ["tech","scientific","education"]
  }
]

const author = [
  {
    id:1,
    name: "Devdutt",
    books: ["12345book","secretBook"]
  },
  {
    id: 2,
    name: "Elon Musk",
    books: ["12345book"]
  }
]

const publication = [
  {
    id: 1,
    name: "writex",
    books: "12345book"
  },
  {
    id:2,
    name: "writex2",
    books:[]
  }
]

// This dataset has to be exported because by default it is secured and cannot be used in other js file

//we have to tell that this js file or dataset has to be exported
// exporting array of object

module.exports = {books, author, publication};
