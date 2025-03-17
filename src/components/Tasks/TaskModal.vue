<template>
  <div v-if="isOpen" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h3 class="text-lg font-semibold mb-4">Editar Tarefa</h3>
      <input v-model="localTask.name" class="border rounded-md p-2 w-full mb-4" @keyup.enter="saveAndClose" />
      <div class="flex justify-end">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" @click="saveAndClose">Salvar</button>
        <button class="bg-gray-400 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded" @click="cancelEdit">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: { type: Object, required: false },
    isOpen: { type: Boolean, required: true },
  },
  data() {
    return {
      localTask: this.task ? { ...this.task } : { name: '' },
    };
  },
  methods: {
    saveAndClose() {
      this.$emit('save', this.localTask);
      this.cancelEdit();
    },
    cancelEdit() {
      this.$emit('cancel');
    },
  },
};
</script>
