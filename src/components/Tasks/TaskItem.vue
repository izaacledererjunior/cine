<template>
    <div class="p-3 border rounded-lg bg-gray-50 flex items-center justify-between shadow-sm transition-all hover:bg-gray-100">
      <span class="text-gray-800 font-medium">{{ task.name }}</span>
      <div class="flex items-center gap-2">
        <button
          @click="editTask"
          class="text-blue-500 hover:text-blue-700 transition"
          aria-label="Editar tarefa"
        >
          ✏️
        </button>
        <button
          @click="deleteTask"
          class="text-red-500 hover:text-red-700 transition"
          aria-label="Excluir tarefa"
        >
          🗑️
        </button>
      </div>
    </div>
  </template>

  <script>
  export default {
    props: {
      task: {
        type: Object,
        required: true,
      },
    },
    methods: {
      editTask() {
        this.$emit('edit', this.task);
      },
      deleteTask() {
        this.$emit('delete', this.task.id);
      },
    },
  };
  </script>
