<template>
  <button @click="logout">Logout</button>
</template>

<script>
export default {
  name: "UserLogout",
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>
