<template>

<div v-if="showDeleteTodo" class="delete-todo-wrapper">

    <div class="delete-todo-form-wrapper">
        <h3>Delete todo?</h3>
        <div class="delete-todo-button-wrapper">
            <button @click="showDeleteTodo = false">Cancel</button>
            <button @click="deleteTodo">Delete</button>
        </div>
    </div>

</div>

</template>


<script setup>

import { selectedTodo, showDeleteTodo, todos } from '../stateManager';

async function deleteTodo() {
    
    let res =await fetch(`http://localhost:3000/delete-todo/${selectedTodo.id}`,
    {
        method: 'DELETE',
        mode: 'cors',
    });
    let response = await res.json();

    // Evaluate response
    switch(response.status) {
        case '400':
            console.log(response.message);
            break;
        default:
            // Successfully deleted todo on backend, now remove todo from State
            let todoIndex = todos.findIndex(item => item.id == selectedTodo.id);
            todos.splice(todoIndex, 1);            
            // Close popup modal
            showDeleteTodo.value = false;
    };
};

</script>



<style lang="scss" scoped>

.delete-todo-wrapper {
    z-index: 1;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.66);
}
.delete-todo-form-wrapper {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #35D0BA;
    padding: 1rem;
    width: 80%;
    border: 1px solid #F8C43A;
    border-radius: .3rem;
    h3 {
        color: #04322E;
        font-weight: 800;
        text-align: center;
    }
}
.delete-todo-button-wrapper {
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding: 1rem 0 0 0;
    width: 100%;
    button {
        background-color: #F8C43A;
        border: 1px solid #35D0BA;
        border-radius: 0.1rem;
        padding: 0.3rem 0;
        color: #04322E;
        font-weight: 800;
        width: 6rem;
    }
}

// Medium devices
@media only screen and (min-width: 576px) {
    .delete-todo-form-wrapper {
        width: 50%;
    }
}

// Large devices
@media only screen and (min-width: 992px) {
    .delete-todo-form-wrapper {
        max-width: 30%;
    }
}

</style>
