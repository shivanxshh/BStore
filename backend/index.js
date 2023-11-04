import express, { Router, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express(); //initialized a server

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to Book Store");
});

//middleware for parsing request body
app.use(express.json());

//middleware for handling cors policy--to check the validity/authenticity of the request type made to the server
//option1 : Allow all Origins with Default cors
app.use(cors());

//option2: Allow custom Origins
// app.use(cors({
//     origin:'http://localhost:3000',  //clients with this origin can access our server
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type'],
// }));

app.use('/books',booksRoute);
  

//mongoose is used to connect with mongodb
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("APP is connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
