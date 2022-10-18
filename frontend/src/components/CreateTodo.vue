<template>

<div v-if="showCreateTodo" class="create-todo-wrapper">

    <div class="create-todo-form-wrapper">
        <div class="create-todo-title-wrapper">
            <p>Title</p>
            <input v-model="todoTitle" type="text" />
        </div>
        <div class="create-todo-details-wrapper">
            <p>Details (optional)</p>
            <textarea v-model="todoDetails" cols="30"></textarea>
        </div>

        <p v-if="errorMessage">{{ errorMessage }}</p>

        <div class="create-todo-button-wrapper">
            <button @click="clearText(), showCreateTodo = false" type="button">Cancel</button>
            <button @click="createTodo" type="button">Submit</button>
        </div>
    </div>
    
</div>

</template>


<script setup>

import { ref } from 'vue';
import { todos, showCreateTodo } from '../stateManager';

let todoTitle = ref('');
let todoDetails = ref('');
let errorMessage = ref('');

async function createTodo() {
    
    // Todo should at least have a title
    if(!todoTitle.value) { 
        // Show error message
        errorMessage.value = 'A Todo must have a title'
        return 
    };

    let res =await fetch('http://localhost:3000/create-todo',
    {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
            title: todoTitle.value,
            details: todoDetails.value
        })
    })
    let response = await res.json();

    // Evaluate response
    switch(response.status) {
        case '400':
            // Show error message
            errorMessage.value = response.message;
            break;
        default:
            // Successfully created todo on backend, now add todo to State
            todos.unshift(response.todo);
            clearText();
            // Close popup modal
            showCreateTodo.value = false;
    };
};

// Function clears input and error message text when leaving this modal
function clearText() {
    errorMessage.value = '';
    todoTitle.value = '';
    todoDetails.value = '';
};

</script>


<style lang="scss" scoped>
.create-todo-wrapper {
    z-index: 1;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.66);
}
.create-todo-form-wrapper {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: .8rem;
    background-color: white;
    padding: 1rem;
    width: 80%;
    border: 1px solid #F8C43A;
    background-color: #35D0BA;
    border-radius: .3rem;

    p {
        color: #04322E;
        font-weight: 800;
    }
    input, textarea {
        border: 1px solid #04322E;
        resize: none;
        font-weight: 800;
        padding: .4rem;
    }
    textarea {
        height: 4rem;
    }
    .create-todo-title-wrapper {
        display: flex;
        flex-direction: column;
    }
    .create-todo-details-wrapper {
        display: flex;
        flex-direction: column;
    }
    .create-todo-button-wrapper {
        display: flex;
        justify-content: center;
        gap: 2rem;
        width: 100%;
        button {
            padding: .3rem 1rem;
        }
    }
}

// Medium devices
@media only screen and (min-width: 576px) {
    .create-todo-form-wrapper {
        width: 50%;
    } 
}

// Large devices
@media only screen and (min-width: 992px) {
    .create-todo-form-wrapper {
        max-width: 30%;
    }
}

</style>