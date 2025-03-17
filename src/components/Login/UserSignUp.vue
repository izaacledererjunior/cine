<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md transition transform animate-fadeIn">
        <h3 class="text-lg font-semibold mb-4 text-gray-800">Criar Conta</h3>
        <form @submit.prevent="signUp">
          <InputCustom label="Nome" id="name" type="text" v-model="name" placeholder="Seu nome" />
          <InputCustom label="Email" id="email" type="email" v-model="email" placeholder="Seu email" />
          <InputCustom label="Senha" id="password" type="password" v-model="password" placeholder="Crie uma senha" />

          <div class="flex justify-between mt-4">
            <ButtonCustom type="submit" size="lg">Criar Conta</ButtonCustom>
            <button @click="$emit('close')" class="text-gray-600 hover:text-gray-900 transition">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </template>

  <script>
  import axios from "@/utils/inputStorage";
  import InputCustom from "./InputCustom.vue";
  import ButtonCustom from "./ButtonCustom.vue";
  import { API_URL_USER } from "@/config/environments";

  export default {
    components: { InputCustom, ButtonCustom },
    props: { isOpen: Boolean },
    data() {
      return { name: "", email: "", password: "" };
    },
    methods: {
      async signUp() {
        if (!this.name || !this.email || !this.password) {
          this.$toast.error("Preencha todos os campos!");
          return;
        }

        try {
          await axios.post(`${API_URL_USER}/users`, {
            name: this.name,
            email: this.email,
            password: this.password,
          });

          this.$toast.success("Cadastro realizado com sucesso!");
          this.$emit("close");
        } catch (error) {
          this.$toast.error(error.response?.data?.message || "Erro ao criar conta");
        }
      },
    },
  };
  </script>
