require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
const Person = require("./models/person");

const app = express();
app.use(express.json());
app.use(express.static("dist"));
app.use(logger);

// Converted
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  }).catch((error) => {
    response.status(400).end();
  });
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      response.status(400).end();
    });
});


app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    let contentMissing = "";
    if (!body.name) {
      contentMissing = "body";
    }
    if (!body.number) {
      contentMissing += " number";
    }
    contentMissing = contentMissing.trim();
    return response.status(400).json({
      error: `content missing - [${contentMissing}]`,
    });
  }

  //const checkForExistence =
  //  phonebook.findIndex((x) => x.name == body.name) >= 0;
  //if (checkForExistence) {
  //  return response.status(409).json({
  //    error: "name already exists",
  //  });
  //}

  const person = new Person({
    name: body.name,
    number: body.number
  }) 
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
});

app.get("/api/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `<p>Phonebook has info for ${persons.length} people</p>\n<p>${new Date()}</p>`,
    );
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
