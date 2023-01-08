//DONE BY NIKHIL MAROJU

const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", async (request, res) => {

  // res.send("Hello World");
  const allTodosAre = await Todo.getTodos();
  if (request.accepts("html")) {
    res.render("index", {
      allTodosAre,
    });
  } else {
    res.json(allTodosAre);
  }
});

app.get("/todos", async function (_request, res) {
  console.log("Processing list of all Todos are ........");
  try {
    const todo = await Todo.findAll();
    return res.send(todo);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }

});

app.get("/todos/:id", async function (request, res) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return res.json(todo);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

app.post("/todos", async function (request, res) {
  try {
    const todo = await Todo.addTodo(request.body);
    return res.json(todo);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, res) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return res.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, res) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  const deleteTodo = await Todo.destroy({ where: { id: request.params.id } });
  res.send(deleteTodo ? true : false);
});

module.exports = app;
