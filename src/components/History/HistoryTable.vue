<template>
  <div class="flex flex-wrap gap-4">
    <div class="flex-1 min-w-[300px] p-2">
      <HistoryColumn title="Para Assistir" header1="Nome" header2="Data Atualização" :tasks="toWatchTasks" />
    </div>
    <div class="flex-1 min-w-[300px] p-2">
      <HistoryColumn title="Assistindo" header1="Nome" header2="Data Atualização" :tasks="watchingTasks" />
    </div>
    <div class="flex-1 min-w-[300px] p-2">
      <HistoryColumn title="Concluídas" header1="Nome" header2="Data Atualização" :tasks="doneTasks" />
    </div>
    <div class="flex-1 min-w-[300px] p-2">
      <HistoryColumn title="Deletadas" header1="Nome" header2="Data Exclusão" :tasks="deletedTasks" />
    </div>
  </div>
</template>

<script>
import HistoryColumn from './HistoryColumn.vue';

export default {
  components: {
    HistoryColumn,
  },
  props: {
    toWatchTasks: Array,
    watchingTasks: Array,
    doneTasks: Array,
    deletedTasks: Array,
  },
};
</script>
