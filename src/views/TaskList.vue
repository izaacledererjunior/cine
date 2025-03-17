<template>
  <div class="bg-gray-100 min-h-screen">
    <AppHeader />
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">📌 Meu Board</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaskListComponent :tasks="toWatchTasks" title="TO WATCH" listName="TO WATCH" />
        <TaskListComponent :tasks="watchingTasks" title="WATCHING" listName="WATCHING" />
        <TaskListComponent :tasks="doneTasks" title="DONE" listName="DONE" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/inputStorage';
import TaskListComponent from '../components/Tasks/TaskListComponent.vue';
import AppHeader from '../components/AppHeader.vue';
import { API_URL_TASK } from '@/config/environments';

export default {
  components: {
    TaskListComponent,
    AppHeader,
  },
  data() {
    return {
      toWatchTasks: [],
      watchingTasks: [],
      doneTasks: [],
    };
  },
  async mounted() {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        this.$toast.error('Usuário não autenticado.');
        this.$router.push('/');
        return;
      }

      const response = await axios.get(
        `${API_URL_TASK}/tasks/user/${userId}`
      );

      const tasks = response.data;
      this.toWatchTasks = tasks.filter((task) => task.status === 'TO WATCH');
      this.watchingTasks = tasks.filter((task) => task.status === 'WATCHING');
      this.doneTasks = tasks.filter((task) => task.status === 'DONE');
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      this.$toast.error('Erro ao buscar tarefas.');
    }
  },
};
</script>
