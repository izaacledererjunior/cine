<template>
  <div id="app">

    <main >
      <router-view></router-view>
    </main>

  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";


@Component({
  components: {
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
}
</style>







