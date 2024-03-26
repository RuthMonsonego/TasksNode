import express from 'express'  
import cors from "cors"
const app = express()
app.use(cors());
const port = 3000
const vec =[{"id":1,"name":"A"},{"id":2,"name":"B"},{"id":3,"name":"C"}]

app.get('/tasks/', (req, res) => {
  res.send(vec)
})

app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = vec.find(e => e.id === id);
  if (task) {
    res.send(task);
  } else {
    res.status(404).send("Task not found");
  }
});

app.post("/tasks/:name",(req, res) => {
  const id = Math.max(...vec.map(e => e.id)) + 1;
  vec.push({"id": id, "name": req.params.name.toString()});
  res.send("added successfully");
});

app.put("/tasks/:id/:name", (req, res) => {
  const id = parseInt(req.params.id);
  const taskToUpdate = vec.find(e => e.id === id);
  if (taskToUpdate) {
    taskToUpdate.name = req.params.name.toString();
    res.send("Updated successfully");
  } else {
    res.status(404).send("Task not found");
  }
});

app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = vec.findIndex(e => e.id === id);
  if (taskIndex !== -1) {
    vec.splice(taskIndex, 1);
    res.send("Deleted successfully");
  } else {
    res.status(404).send("Task not found");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})