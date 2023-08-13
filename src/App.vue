<template>
  <div id="app" class="appBg bg-scroll">
    <ToDoApp></ToDoApp>
  </div>
</template>

<script>
import ToDoApp from './components/ToDoApp.vue'

export default {
  name: 'App',
  components: {
    ToDoApp
  }
}
</script>

<style scoped>
.appBg {
  background-image: url('https://media.istockphoto.com/id/1248398407/photo/bokeh.jpg?b=1&s=612x612&w=0&k=20&c=NfDBnq5ceveBgvL8JHXuu_StMIN-ryf_f3o8Vh-F1i8=');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>