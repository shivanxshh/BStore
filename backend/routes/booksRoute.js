import express from 'express';
import {Book} from '../models/bookModel.js';

const router=express.Router();   ///defining express router


//Route for save a new book
router.post("/", async (request, response) => {
  console.log("insidepost");
  try {
    if (
      !request.body.title ||
      !request.body.author || !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title,author,publishYear",
      });
    }
    const newBook = {
      //adding from our side
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook); //model will create newBook with defined schema
    return response.status(201).send(book); //response will be in json format following the schema
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//ROute for getting all books from database
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//ROute for getting one book with the help of ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route to update a book

router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author || !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title,author,publishYear",
      });
    }

    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book updated succesfully" });
  }
   catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


//Delete a book
router.delete("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const result = await Book.findByIdAndDelete(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: "Book not found" });
      }
      return response.status(200).send({ message: "Book deleted succesfully" });
    }
     catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });


  export default router;