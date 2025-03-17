<template>
  <div>
    <div class="flex-1 p-4 rounded-lg m-2 shadow-sm border" :class="borderClass">
      <h2 class="text-lg font-semibold text-center mb-4 text-gray-800">{{ title }}</h2>
      <draggable
        v-model="localTasks"
        :options="{ group: 'tasks' }"
        @change="updateTasks"
      >
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
          class="flex-1 p-2 border rounded mr-2"
          @input="validateInput"
          @keyup.enter="addTask"
        />
        <fa-icon
          name="plus-circle"
          class="text-2xl text-blue-500 cursor-pointer"
          @click="addTask"
        />
      </div>
    </div>
    <TaskModal
      :task="editingTask"
      :isOpen="isModalOpen"
      @save="saveTaskModal"
      @cancel="closeModal"
    />
  </div>
</template>

<script>
import axios from "@/utils/inputStorage";
import draggable from 'vuedraggable';
import TaskItem from './TaskItem.vue';
import TaskModal from './TaskModal.vue';
import FaIcon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/plus-circle';
import * as yup from 'yup';
import { API_URL_TASK } from '@/config/environments';

export default {
  components: {
    draggable,
    TaskItem,
    TaskModal,
    'fa-icon': FaIcon,
  },
  props: {
    title: String,
    listName: String,
    tasks: Array,
  },
  data() {
    return {
      localTasks: [...this.tasks],
      newTask: '',
      schema: yup.string().max(50, 'A tarefa não pode ter mais de 50 caracteres'),
      isModalOpen: false,
      editingTask: null,
    };
  },
  computed: {
    borderClass() {
      if (this.title === 'TO WATCH') return 'border-red-500';
      if (this.title === 'WATCHING') return 'border-purple-500';
      return 'border-blue-800';
    },
  },
  methods: {
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
    async updateTasks() {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!userId || !token) {
          this.$toast.error('Usuário não autenticado.');
          return;
        }

        for (const task of this.localTasks) {
          if (task.status !== this.listName) {
            await axios.put(
              `${API_URL_TASK}/tasks/${task.id}`,
              {
                name: task.name,
                description: task.description,
                status: this.listName,
                userId: parseInt(userId),
              },
              {

              }
            );
          }
        }

        this.$emit('task-changed', this.listName, this.localTasks);
      } catch (error) {
        console.error('Erro ao atualizar tarefas:', error);
        this.$toast.error('Erro ao atualizar tarefas.');
      }
    },
    async addTask() {
      if (this.newTask.trim()) {
        try {
          const userId = localStorage.getItem('userId');
          const token = localStorage.getItem('token');

          if (!userId || !token) {
            this.$toast.error('Usuário não autenticado.');
            return;
          }

          const response = await axios.post(
            `${API_URL_TASK}/tasks`,
            {
              name: this.newTask,
              description: 'Filme',
              status: this.listName,
              userId: parseInt(userId),
            },
            {
            }
          );

          this.localTasks.push(response.data);
          this.newTask = '';
          this.updateTasks();
        } catch (error) {
          console.error('Erro ao criar tarefa:', error);
          this.$toast.error('Erro ao criar tarefa.');
        }
      }
    },
    editTask(index, task) {
      this.editingTask = { ...task, index };
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.editingTask = null;
    },
    async saveTaskModal(updatedTask) {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        this.$toast.error('Usuário não autenticado.');
        return;
      }

      const parsedUserId = parseInt(userId, 10);
      if (isNaN(parsedUserId)) {
        console.error('Erro: userId inválido:', userId);
        this.$toast.error('Erro ao obter usuário. Faça login novamente.');
        return;
      }

      try {
        if (!updatedTask.id) {
          console.error('Erro: ID da tarefa não está definido:', updatedTask);
          this.$toast.error('Erro ao editar tarefa.');
          return;
        }


        await axios.put(
          `${API_URL_TASK}/tasks/${updatedTask.id}`,
          {
            name: updatedTask.name,
            description: updatedTask.description || "Filme",
            status: this.listName,
            userId: parsedUserId,
          },
          {
          }
        );

        this.localTasks = this.localTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );

        this.closeModal();
      } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        this.$toast.error('Erro ao atualizar tarefa.');
      }
    },
    async deleteTaskFromBackend(taskId) {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        this.$toast.error('Usuário não autenticado.');
        return;
      }

      try {
        await axios.delete(`${API_URL_TASK}/tasks/${taskId}`, {

        });
        this.localTasks = this.localTasks.filter((task) => task.id !== taskId);
      } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
        this.$toast.error('Erro ao deletar tarefa.');
      }
    },
    deleteTask(index) {
      const taskId = this.localTasks[index].id;
      this.deleteTaskFromBackend(taskId);
    },
  },
  watch: {
    tasks: {
      handler(newTasks) {
        this.localTasks = [...newTasks];
      },
      deep: true,
    },
  },
};
</script>
