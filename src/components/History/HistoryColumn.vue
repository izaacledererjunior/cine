<template>
  <div class="bg-white rounded-lg shadow-md p-4 mb-4 overflow-y-auto max-h-96">
    <h3 class="text-lg font-semibold mb-2 text-blue-600">{{ title }}</h3>
    <table class="w-full">
      <thead>
        <tr>
          <th class="text-left py-2 px-3">{{ header1 }}</th>
          <th class="text-left py-2 px-3">{{ header2 }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id" class="hover:bg-gray-100">
          <td class="py-2 px-3">{{ task.name }}</td>
          <td class="py-2 px-3">{{ formatDate(task.date) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    header1: String,
    header2: String,
    tasks: Array,
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) {
        return '';
      }
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error('Data inválida:', dateString);
        return 'Data inválida';
      }
      return date.toLocaleDateString('pt-BR');
    },
  },
};
</script>
