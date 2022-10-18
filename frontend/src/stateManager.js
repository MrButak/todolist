import { reactive, ref } from 'vue';

// Store all of the todos from the backend here
let todos = reactive([]);

// When a todo is selected to delete, store it here (I will reference the id in the backend)
let selectedTodo = {};

// Popup modals
let showCreateTodo = ref(false);
let showDeleteTodo = ref(false);

export { todos, showCreateTodo, showDeleteTodo, selectedTodo };
