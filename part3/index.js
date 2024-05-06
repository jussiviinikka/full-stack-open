require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(function (tokens, req, res) {
    const msg = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
    if (req.method === "POST") {
      return [msg, tokens.body(req, res)].join(" ");
    }
    return msg;
  }),
);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// let persons = [
//   {
//     name: "Arto Hellas",
//     number: "040-123456",
//     id: 1,
//   },
//   {
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//     id: 2,
//   },
//   {
//     name: "Dan Abramov",
//     number: "12-43-234345",
//     id: 3,
//   },
//   {
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//     id: 4,
//   },
// ];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response, next) => {
  // response.json(persons);
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p></br>${new Date().toLocaleString()}`,
  );
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
  // const id = Number(request.params.id);
  // const note = persons.find((note) => note.id === id);
  // if (note) {
  //   response.json(note);
  // } else {
  //   response.status(404).end();
  // }
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      return response.status(204).end();
    })
    .catch((error) => next(error));
  // const id = Number(request.params.id);
  // const person = persons.find((p) => p.id === id);
  // if (person) {
  //   persons = persons.filter((p) => p.id != id);
  //   response.json(person);
  // } else {
  //   response.status(404).end();
  // }
});

app.post("/api/persons/", (request, response) => {
  const person = { ...request.body };
  if (!(("name" in person) & ("number" in person))) {
    return response.status(400).send({ error: "name or number missing" });
  }
  // if (persons.find((p) => p.name === person.name)) {
  //   return response.status(400).send({ error: "name already exists" });
  // }
  // person.id = id;
  // persons = persons.concat(person);
  // return response.status(201).send(person);

  const personDB = new Person({
    name: person.name,
    number: person.number,
  });

  personDB.save().then((savedPerson) => {
    return response.status(201).json(savedPerson);
  });
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
