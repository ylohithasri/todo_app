<template>
  <div id="app" class="max-w-3xl mx-auto p-4 h-screen">
    <h1 class="alignCenter text-xl md:text-4xl font-semibold max-w-lg mx-auto mb-4 text-green-900">Todo List App</h1>
    <form @submit.prevent="addTodo" class="alignCenter max-w-lg mx-auto">
      <input v-model="newTodo.title"
        class="border border-green-500 border-t-2 border-r-2 rounded px-3 py-2 w-full mb-2 text-green-800"
        placeholder="Title">
      <input type="date" v-model="newTodo.dueDate"
        class="border border-green-500 rounded px-3 py-2 w-full mb-2 text-green-800 border-t-2 border-r-2"
        placeholder="Estimated End Date">
      <p v-if="alertmsg" class="my-2 text-red-500">Please fill out required fields before submitting</p>
      <button type="submit" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded border-green-600">Add
        Todo</button>
    </form>
    <table v-if="todos.length > 0" class="w-full border-collapse mt-4">
      <thead>
        <tr class="bg-green-200">
          <th class="py-2 px-4 border border-green-600 text-green-800 text-xs sm:text-sm md:text-base">Tasks</th>
          <th class="py-2 px-4 border border-green-600 text-green-800 text-xs sm:text-sm md:text-base">Due Date</th>
          <th class="py-2 px-4 border border-green-600 text-green-800 text-xs sm:text-sm md:text-base">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in filteredTodos" :key="index" class="border"
          :class="(isPastDate(todo.dueDate) && todo.status === 'ToDo') ? 'bg-red-200' : 'bg-white'">
          <td class="border border-green-600 px-2 md:px-4 py-2">
            <input v-if="index !== editingIndex" class="mx-2 border-green-500" type="checkbox"
              v-model="todo.markAsCompleted" @click="toggleCompleted(index)">
            <span v-if="index !== editingIndex" class="text-green-800 text-xs sm:text-sm md:text-base"
              :class="todo.status === 'Completed' ? 'todocompleted' : ''">{{ todo.title
              }}</span>
            <input v-else v-model="todo.title" class="border border-green-500 text-green-800 text-xs sm:text-sm md:text-base rounded px-2 py-1 w-full">
          </td>
          <td class="alignCenter py-2 px-2 md:px-4 border border-green-600 text-green-800">
            <span v-if="index !== editingIndex" class="text-green-800 text-xs sm:text-sm md:text-base"
              :class="todo.status === 'Completed' ? 'todocompleted' : ''">{{ todo.dueDate }}</span>
            <input v-else type="date" v-model="todo.dueDate"
              class="border border-green-500 text-green-800 text-xs sm:text-sm md:text-base rounded px-2 py-1 w-full">
          </td>
          <td class="alignCenter py-2 px-2 md:px-4 border border-green-600">
            <button v-if="index !== editingIndex" @click="editTodo(index)" class="text-green-500 mr-2"
              :class="todo.status === 'Completed' ? 'hideEdit' : 'showEdit'">
              <i class="fas fa-edit text-xs md:text-base" title="Edit"></i>
            </button>
            <button v-if="index === editingIndex" @click="saveTodo(index)" class="text-green-500 mr-2">
              <i class="fas fa-save text-xs md:text-base" title="Save"></i>
            </button>
            <button @click="deleteTodo(index)" class="text-red-400 mr-2">
              <i class="fas fa-trash text-xs md:text-base" title="Delete"></i>
            </button>
            <button @click="duplicateTask(index)" class="text-blue-400">
              <i class="fas fa-copy text-xs md:text-base" title="Duplicate"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="alignCenter max-w-lg mx-auto mt-4 text-green-800">No todo tasks currently.</p>
    <p v-if="alertmsgnew" class="alignCenter my-2 text-red-500">Please fill out required fields before saving</p>
    <div class="alignCenter mt-4">
      <input type="radio" class="mx-2" id="all" value="" v-model="filterStatus">
      <label for="all" class="mx-2">View All Tasks</label>
      <input type="radio" class="mx-2" id="toDo" value="ToDo" v-model="filterStatus">
      <label for="completed" class="mx-2">View ToDO tasks</label>
      <input type="radio" class="mx-2" id="completed" value="Completed" v-model="filterStatus">
      <label class="mx-2" for="notCompleted">View Completed Tasks</label>
    </div>
    <div v-if="showConfirmDelete" class="fixed inset-0 flex items-center justify-center h-screen bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded shadow-lg mx-auto alignCenter">
        <p class="mb-4">Are you sure you want to delete this task?</p>
        <button @click="deleteConfirmed"
          class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2">Delete</button>
        <button @click="closeDeleteConfirmation"
          class="bg-gray-200 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToDoApp',
  computed: {
    newTodo() {
      return this.$store.state.newTodo;
    },
    todos() {
      return this.$store.state.todos;
    },
    editingIndex() {
      return this.$store.state.editingIndex;
    },
    alertmsg() {
      return this.$store.state.alertmsg;
    },
    alertmsgnew() {
      return this.$store.state.alertmsgnew;
    },
    filterStatus: {
      get() {
        return this.$store.state.filterStatus;
      },
      set(value) {
        this.$store.state.filterStatus = value;
      },
    },
    showConfirmDelete() {
      return this.$store.state.showConfirmDelete;
    },
    deleteIndex() {
      return this.$store.state.deleteIndex;
    },
    filteredTodos() {
      return this.$store.getters.filteredTodos;
    },
  },
  methods: {
    addTodo() {
      this.$store.commit('addTodo');
    },
    editTodo(index) {
      this.$store.commit('editTodo', index);
    },
    saveTodo(index) {
      this.$store.commit('saveTodo', index);
    },
    deleteTodo(index) {
      this.$store.commit('deleteTodo', index);
    },
    deleteConfirmed() {
      this.$store.commit('deleteConfirmed');
    },
    closeDeleteConfirmation() {
      this.$store.commit('closeDeleteConfirmation');
    },
    duplicateTask(index) {
      this.$store.commit('duplicateTask', index);
    },
    toggleCompleted(index) {
      this.$store.commit('toggleCompleted', index);
    },
    isPastDate(date) {
      const dueDate = new Date(date);
      const today = new Date();
      return dueDate < today;
    },
  },
  created() {
    this.$store.dispatch('initializeTodos');
  },
};
</script>

<style scoped>
html {
  background-color: #e6e6e6;
  font-size: 12pt;
}

.alignCenter {
  text-align: center;
}

.todocompleted {
  text-decoration: line-through;
}

.hideEdit {
  display: none;
}

.showEdit {
  display: inline-flex;
}
</style>