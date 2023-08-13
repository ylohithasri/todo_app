import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newTodo: {
      title: "",
      status: "ToDo",
      dueDate: "",
      markAsCompleted: false
    },
    todos: [],
    editingIndex: -1,
    alertmsg: false,
    alertmsgnew: false,
    filterStatus: "",
    showConfirmDelete: false,
    deleteIndex: -1
  },
  getters: {
    filteredTodos: state => {
      if (state.filterStatus === "") {
        return state.todos;
      } else {
        return state.todos.filter(
          todo => String(todo.status) === state.filterStatus
        );
      }
    }
  },
  mutations: {
    addTodo(state) {
      if (
        state.newTodo.title.trim() === "" ||
        state.newTodo.dueDate.trim() === ""
      ) {
        state.alertmsg = true;
        return;
      }
      if (state.editingIndex === -1) {
        state.todos.push({
          title: state.newTodo.title,
          status: "ToDo",
          dueDate: state.newTodo.dueDate
        });
      } else {
        state.todos[state.editingIndex].title = state.newTodo.title;
        state.todos[state.editingIndex].status = "ToDo";
        state.todos[state.editingIndex].dueDate = state.newTodo.dueDate;
        state.editingIndex = -1;
      }
      state.alertmsg = false;
      state.newTodo = {
        title: "",
        status: "ToDo",
        dueDate: ""
      };
    },
    editTodo(state, index) {
      if (state.editingIndex === index) {
        state.editingIndex = -1;
      } else {
        state.editingIndex = index;
      }
    },
    saveTodo(state, index) {
      if (
        state.todos[index].title === "" ||
        state.todos[index].dueDate === ""
      ) {
        state.alertmsgnew = true;
        return;
      }
      state.alertmsgnew = false;
      state.editingIndex = -1;
    },
    deleteTodo(state, index) {
      state.showConfirmDelete = true;
      state.deleteIndex = index;
    },
    deleteConfirmed(state) {
      state.alertmsgnew = false;
      state.todos.splice(state.deleteIndex, 1);
      state.showConfirmDelete = false;
      state.deleteIndex = -1;
    },
    closeDeleteConfirmation(state) {
      state.alertmsgnew = false;
      state.showConfirmDelete = false;
      state.deleteIndex = -1;
    },
    duplicateTask(state, index) {
      const duplicateTodo = { ...state.todos[index] };
      duplicateTodo.title += " (Copy)";
      state.todos.push(duplicateTodo);
    },
    toggleCompleted(state, index) {
      state.todos[index].markAsCompleted = !state.todos[index].markAsCompleted;
      if (state.todos[index].markAsCompleted) {
        state.todos[index].status = "Completed";
      } else {
        state.todos[index].status = "ToDo";
      }
    },
    loadTodos(state) {
      const savedTodos = { ...state.todos };
      if (savedTodos) {
        state.todos = JSON.parse(savedTodos);
      }
    }
  },
  actions: {
    initializeTodos({ commit }) {
      commit("loadTodos");
    }
  }
});
