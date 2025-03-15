<template>
  <div class="bg-gray-50 min-h-screen overflow-y-auto p-6">
    <h2 class="text-3xl font-bold mb-6 text-purple-800 border-b pb-3">Histórico de Tarefas</h2>
    <HistoryTable
      :toWatchTasks="toWatchTasks"
      :watchingTasks="watchingTasks"
      :doneTasks="doneTasks"
      :deletedTasks="deletedTasks"
    />
  </div>
</template>

<script setup>
import axios from 'axios';
import HistoryTable from './HistoryTable.vue';
import { ref, onMounted } from 'vue';
import { API_URL_TASK } from '@/config/environments';

const toWatchTasks = ref([]);
const watchingTasks = ref([]);
const doneTasks = ref([]);
const deletedTasks = ref([]);

onMounted(async () => {
  try {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const activeTasksResponse = await axios.get(
      `${API_URL_TASK}/tasks/user/${userId}`,
      { headers: { Authorization: token } }
    );

    const activeTasks = activeTasksResponse.data;

    toWatchTasks.value = activeTasks
      .filter((task) => (task.status === 'TO WATCH' || task.status === 'TO_WATCH') && task.deletedAt === null)
      .map((task) => ({ ...task, date: task.updatedAt }));

    watchingTasks.value = activeTasks
      .filter((task) => task.status === 'WATCHING' && task.deletedAt === null)
      .map((task) => ({ ...task, date: task.updatedAt }));

    doneTasks.value = activeTasks
      .filter((task) => task.status === 'DONE' && task.deletedAt === null)
      .map((task) => ({ ...task, date: task.updatedAt }));

    const deletedTasksResponse = await axios.get(
      `${API_URL_TASK}/tasks/deleted/user/${userId}`,
      { headers: { Authorization: token } }
    );

    deletedTasks.value = deletedTasksResponse.data
      .filter((task) => task.deletedAt !== null)
      .map((task) => ({ ...task, date: task.deletedAt }));
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
  }
});
</script>
