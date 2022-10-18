<template>

<h2 class="main-title-text">Todo List For Trusty.care</h2>
<div class="create-todo-button-wrapper">
    <button @click="showCreateTodo = true">Create Todo</button>
</div>

</template>

<script setup>

import { showCreateTodo } from '../stateManager';

</script>


<style lang="scss" scoped>

.main-title-text {
    text-align: center;
    padding: 1rem 0;
    color: #04322E;
    background-color: #35D0BA;
    font-family: system-ui;
    border-bottom: 1px solid #F8C43A;
}
.create-todo-button-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 1rem 0;
    button {
        padding: .3rem;
    }
}

</style>
