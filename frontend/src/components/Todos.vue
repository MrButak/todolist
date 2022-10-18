<template>
 
<div v-if="todos.length" class="todo-card-wrapper">

    <div v-for="todo in todos" class="todo-card">
        <h3>{{ todo.title }}</h3>
        <p>{{ todo.details }}</p>
        <div class="delete-button-wrapper">
            <button @click="handleDeleteTodo(todo)">Delete</button>
        </div>
        
    </div>
  
</div>

</template>



<script setup>

import { todos, showDeleteTodo, selectedTodo } from '../stateManager';

// Fetch all Todos
(async() => {
    let res = await fetch('http://localhost:3000',
    {
        method: 'GET',
        mode: 'cors'
    });
    let response = await res.json();

    // reassign reactive Object
    Object.assign(todos, response);
})();

function handleDeleteTodo(todo) {

    // Update State. I will use the currently selected todo's id to identify it in the backend JSON file.
    Object.assign(selectedTodo, todo); // 
    // Show delete todo popup modal
    showDeleteTodo.value = true
};

</script>



<style lang="scss" scoped>

.todo-card-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: .3rem;
    padding: .4rem;
    .todo-card {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        padding: 0.6rem;
        width: 49%;
        border: 1px solid #35D0BA;
        background-color: #04322E;
        border-radius: 0.6rem;
        h3, p {
            word-break: break-word;
        }
        .delete-button-wrapper {
            display: flex;
            height: 100%;
            align-items: flex-end;
            justify-content: center;
            button {
                width: 100%;
            }
        }
    }
}

// Medium devices
@media only screen and (min-width: 576px) {
    .todo-card-wrapper {
        gap: .8rem;
        padding: .8rem;
        .todo-card {
            width: 49%;
        }
    }
}

// Large devices
@media only screen and (min-width: 992px) {
    .todo-card-wrapper {
        gap: 1rem;
        padding: 1rem;
        .todo-card {
            width: 23%;
        }
    }
}

</style>
