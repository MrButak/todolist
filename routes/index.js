var express = require('express');
var router = express.Router();

const fs = require('fs');

// GET all todos from JSON and send to frontend
router.get('/', ((req, res, next) => {
    
    let todos = fs.readFileSync('./todos.json', {encoding:'utf8'})
    res.send(todos);
}));


// POST (create) a new todo
router.post('/create-todo', ((req, res, next) => {

    let todoTitle = '';
    let todoDetails = '';
    
    // Get the todo Title and Details from the request body
    try {
        let keys = Object.keys(req.body);	
        let todo = JSON.parse(keys);
        todoTitle = todo.title;
        todoDetails = todo.details;

        // Load file in memory
        let todos = JSON.parse(fs.readFileSync('./todos.json'));

        // Assign an id to the todo
        let todoId = 1;

        // If there are already some todos, get the largest todo id, so I know what id to give the new one
        if(todos.length) {
            let todoIds = todos.map(item =>{ return item.id });
            let largestId = Math.max(...todoIds);
            todoId = largestId + 1;
        };
        
        // Add new todo to the array
        todos.push({title: todoTitle, details: todoDetails, id: todoId});
        
        // Re-write todo file
        fs.writeFileSync('./todos.json', JSON.stringify(todos), {encoding:'utf8'});

        // Successfully created todo
        return res.status(200).json({status: '200', message: 'Successfully created Todo', todo: {title: todoTitle, details: todoDetails, id: todoId}});
    }
    catch(error) {
        console.log(error)
        // Unsuccessfully created todo
		return res.status(400).json({status: '400', message: 'Could not create Todo'});
    };
}));


// DELETE a todo using the todo id as reference
router.delete('/delete-todo/:todoId', ((req, res, next) => {

    try {
        // Get the todo id from query parameter
        let todoId = req.params.todoId;

        // Load file in memory
        let todos = JSON.parse(fs.readFileSync('./todos.json'));
        
        // Filter out the todo to be deleted using the todo.id
        let todosWithTodoRemoved = todos.filter((item) => item.id != todoId);

        // Re-write the file without the todo that was deleted
        fs.writeFileSync('./todos.json', JSON.stringify(todosWithTodoRemoved), {encoding:'utf8'});

        // Successfully deleted todo
        return res.status(200).json({status: '200', message: 'Successfully Deleted Todo'});
    }
    catch(error) {
        console.log(error);
        // Unsuccessfully deleted todo
        return res.status(400).json({status: '400', message: 'An error occoured, could not delete todo'});        
    }
}));

module.exports = router;
