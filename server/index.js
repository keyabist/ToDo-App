const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({msg: "Home Page"})
});

app.get("/todos", async (req, res) => {
    try{
        const todos = await pool.query("SELECT * FROM todo_table")
        res.json(todos.rows)
    } catch(err){
        res.json({error: err.message});
    }
});

app.post("/todos", async (req, res) => {
    try{
       const {desc, completed} = req.body;
       console.log(desc,completed);
       const newTodo = await pool.query("INSERT INTO todo_table (todo_desc, todo_completed) VALUES($1, $2) RETURNING *", [desc, completed]
    );
    res.json({newTodo, msg: "Todo added", success: true});
    } catch(err){
        res.json({ error: err.message });
    }
})

app.get("/todos/:id", async(req, res) => {
    try{
        const {id} = req.params
        const todo = await pool.query("SELECT * FROM todo_table WHERE todo_id=$1", [id]);
        res.json(todo.rows);
    } catch(error) {
        res.json(error);
    }
})

app.put("/todos/:id", async(req, res) => {
    try{
        const {id} = req.params
        const {desc, completed} = req.body
        const todo = await pool.query("UPDATE todo_table SET todo_desc = $1, todo_completed = $2 WHERE todo_id = $3", [desc, completed, id]);
        res.json({msg: "Todo updated.", success: true});
    } catch(error) {
        res.json(error)
    }
})

app.delete("/todos/:id", async(req, res) => {
    try{
        const {id} = req.params
        const delTodo = await pool.query("DELETE FROM todo_table WHERE todo_id = $1", [id]);
        res.json({msg: "Todo deleted", success: true});
    } catch(error) {
        res.json(error)
    }
})

app.delete("/todos", async(req, res) => {
    try{
        const delAllTodos = await pool.query("DELETE FROM todo_table");
        res.json({msg: "All todos deleted.", success: true})
    } catch(error) {
        res.json(error)
    }
})


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}...`);
});