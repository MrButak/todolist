<template>

<Header />
<Todos />
<CreateTodo />
<DeleteTodo />

</template>



<script setup>

import Todos from './components/Todos.vue';
import CreateTodo from './components/CreateTodo.vue';
import DeleteTodo from './components/DeleteTodo.vue';
import Header from './components/Header.vue';

</script>



<style lang="scss">

// Global CSS
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
}
html {
    background-color: #C93D1B;
    color: #F8C43A;
}
p {
    font-size: large;
}
button {
    background-color: #F8C43A;
    border: 1px solid #35D0BA;
    border-radius: .1rem;
    padding: .3rem 0;
    color: #04322E;
    font-weight: 800;
    font-size: medium;
}

</style>
