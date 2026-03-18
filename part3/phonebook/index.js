const express = require("express");
const app = express();
const morgan = require("morgan")

app.use(express.json());

morgan.token("bodyToJson", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    tokens["bodyToJson"](req, res),
  ].join(" ");
}));

let phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(phonebook);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const phonebookEntry = phonebook.find((person) => person.id === id);
  if (!phonebookEntry) {
    return response.status(404).end();
  }
  response.json(phonebookEntry);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const phonebookEntry = phonebook.find((person) => person.id === id);
  if (!phonebookEntry) {
    return response.status(404).end();
  }
  phonebook = phonebook.filter((phonebookEntry) => phonebookEntry.id !== id);
  response.status(204).end();
});

const generateId = () => {
  const min = 1; 
  const max = 10000000; 
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    let contentMissing = ""
    if (!body.name) {
      contentMissing = "body"
    }
    if (!body.number) {
      contentMissing += " number";
    }
    contentMissing = contentMissing.trim()
    return response.status(400).json({
      error: `content missing - [${contentMissing}]`,
    });
  }

  const checkForExistence = (phonebook.findIndex(x => x.name == body.name) >= 0)
  if (checkForExistence) {
    return response.status(409).json({
      error: "name already exists",
    });
  }

  const phonebookEntry = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  phonebook = phonebook.concat(phonebookEntry);

  response.json(phonebookEntry);
});

app.get("/api/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${phonebook.length} people</p>\n<p>${new Date()}</p>`,
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
