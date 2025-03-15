<template>
  <div class="mb-4">
    <label :for="id" class="block text-gray-700 font-bold mb-2">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      v-model="inputValue"
      :placeholder="placeholder"
      class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    id: String,
    type: String,
    value: String,
    placeholder: String
  },
  data() {
    return {
      inputValue: this.value
    };
  },
  watch: {
    inputValue(newVal) {
      this.$emit('input', newVal);
    }
  }
};
</script>
