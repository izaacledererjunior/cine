<template>
    <div class="flex-1 p-4 rounded-lg shadow-md border bg-white transition-transform transform hover:scale-105" :class="borderClass">
      <h2 class="text-lg font-semibold text-center mb-4">{{ title }}</h2>

      <draggable v-model="localTasks" :options="{ group: 'tasks' }" @change="updateTasks">
        <TaskItem
          v-for="(task, index) in localTasks"
          :key="task.id"
          :task="task"
          @edit="editTask(index, task)"
          @delete="deleteTask(index)"
        />
      </draggable>

      <div class="flex mt-4">
        <input
          type="text"
          v-model="newTask"
          placeholder="Nova tarefa"
          class="flex-1 p-2 border rounded-lg focus:ring focus:ring-purple-300 transition"
          @input="validateInput"
          @keyup.enter="addTask"
        />
        <button @click="addTask" class="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
          ➕
        </button>
      </div>
    </div>
  </template>

  <script>
  import draggable from "vuedraggable";
  import TaskItem from "./TaskItem.vue";
  import * as yup from "yup";

  export default {
    components: {
      draggable,
      TaskItem,
    },
    props: {
      title: String,
      listName: String,
      tasks: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        localTasks: this.getLocalTasks(),
        newTask: "",
        schema: yup.string().max(50, "A tarefa não pode ter mais de 50 caracteres"),
      };
    },
    computed: {
      borderClass() {
        return {
          "border-red-500": this.title === "TO WATCH",
          "border-purple-500": this.title === "WATCHING",
          "border-blue-800": this.title === "DONE",
        };
      },
    },
    methods: {
      getLocalTasks() {
        return Array.isArray(this.tasks) ? [...this.tasks] : [];
      },
      validateInput() {
        try {
          this.schema.validateSync(this.newTask);
        } catch (error) {
          if (error instanceof yup.ValidationError) {
            this.$toast.error(error.message);
            this.newTask = this.newTask.slice(0, 50);
          }
        }
      },
      addTask() {
        if (this.newTask.trim()) {
          const newTaskObject = {
            id: Date.now(),
            text: this.newTask,
            status: this.listName,
          };

          this.localTasks.push(newTaskObject);
          this.newTask = "";
          this.updateTasks();
        }
      },
      updateTasks() {
        this.$emit("task-changed", this.listName, this.localTasks);
      },
      editTask(index, task) {
        this.$emit("edit", this.listName, index, task);
      },
      deleteTask(index) {
        this.localTasks.splice(index, 1);
        this.updateTasks();
      },
    },
    watch: {
      tasks: {
        handler(newTasks) {
          this.localTasks = this.getLocalTasks();
        },
        deep: true,
      },
    },
  };
  </script>
