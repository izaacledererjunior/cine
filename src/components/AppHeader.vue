<template>
  <header class="bg-purple-700 text-white px-6 py-4 flex justify-between items-center shadow-lg">
    <button
        @click="goHome"
        class="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition duration-300"
      >
        <h1 class="text-2xl font-bold">🎬 CineList</h1>
      </button>
    <nav class="flex gap-4">
      <button
        @click="goToHistory"
        class="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition duration-300"
      >
        📜 <span class="hidden sm:inline">Histórico</span>
      </button>
      <button
        @click="logout"
        class="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition duration-300"
      >
        🚪 <span class="hidden sm:inline">Logout</span>
      </button>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  methods: {
    goToHistory() {
      this.$router.push('/history');
    },
    goHome() {
      this.$router.push('/home');
      window.location.reload();
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.$router.push('/');
      window.location.reload();
    }
  }
};
</script>
