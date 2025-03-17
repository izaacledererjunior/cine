 <template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-600">
    <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-gray-200">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-800">Login</h2>
      <form @submit.prevent="login">
        <InputCustom label="Email" id="email" type="email" v-model="email" placeholder="Digite seu email" />
        <InputCustom label="Senha" id="password" type="password" v-model="password" placeholder="Digite sua senha" />

        <div class="flex items-center justify-between mt-4">
          <ButtonCustom type="submit">Entrar</ButtonCustom>
          <a
            class="text-sm text-blue-600 hover:text-blue-800 cursor-pointer transition"
            @click.prevent="openSignupModal"
          >
            Criar Conta
          </a>
        </div>
      </form>
    </div>

    <UserSignUp :isOpen="isSignupModalOpen" @close="closeSignupModal" />
  </div>
</template>

<script>
import axios from "@/utils/inputStorage";
import jwt_decode from "jwt-decode";
import InputCustom from "@/components/Login/InputCustom.vue";
import ButtonCustom from "@/components/Login/ButtonCustom.vue";
import UserSignUp from "@/components/Login/UserSignUp.vue";
import { API_URL_USER } from "@/config/environments";

export default {
  components: { InputCustom, ButtonCustom, UserSignUp },
  data() {
    return { email: "", password: "", isSignupModalOpen: false };
  },
  methods: {
    async login() {
      if (!this.email || !this.password) {
        this.$toast.error("Preencha todos os campos!");
        return;
      }

      try {
        const response = await axios.post(`${API_URL_USER}/login`, {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", jwt_decode(response.data.token).userId);
        this.$router.push("/home");
        this.$toast.success("Login realizado com sucesso!");
      } catch (error) {
        this.$toast.error("Erro ao fazer login");
      }
    },
    openSignupModal() { this.isSignupModalOpen = true; },
    closeSignupModal() { this.isSignupModalOpen = false; },
  },
};
</script>

