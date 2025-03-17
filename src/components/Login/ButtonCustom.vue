<template>
    <button
      :type="type"
      class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300"
    >
      <slot></slot>
    </button>
  </template>

  <script>
  export default {
    props: {
      type: {
        type: String,
        default: 'button'
      }
    }
  };
  </script>
