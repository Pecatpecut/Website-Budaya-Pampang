<template>
  <div class="login-page">

    <!-- LEFT -->
    <div class="login-left">
      <div class="overlay"></div>

      <div class="left-content">
        <h1>Desa Budaya Pampang</h1>
        <p>Kelola konten budaya dengan mudah dan profesional</p>
      </div>
    </div>

    <!-- RIGHT -->
    <div class="login-right">

      <div class="login-form" :class="{ show: isLoaded }">

        <h2>Login</h2>

        <!-- ERROR -->
        <p v-if="error" class="error-text">
          {{ error }}
        </p>

        <!-- EMAIL -->
        <div 
          class="input-group"
          :class="{ 'is-error': error && !email }"
        >
          <Mail class="icon" />
          <input 
            type="email"
            v-model="email"
            placeholder="Email"
          />
        </div>

        <!-- PASSWORD -->
        <div 
          class="input-group"
          :class="{ 'is-error': error && !password }"
        >
          <Lock class="icon" />

          <input 
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Password"
            @keyup.enter="handleLogin"
          />

          <button class="eye" @click="togglePassword">
            <Eye v-if="!showPassword" />
            <EyeOff v-else />
          </button>
        </div>

        <div class="forgot">Lupa Password?</div>

        <button 
          class="btn-login"
          :disabled="loading"
          @click="handleLogin"
        >
          <span v-if="!loading">Login</span>
          <span v-else class="spinner"></span>
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Mail, Lock, Eye, EyeOff } from 'lucide-vue-next'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const showPassword = ref(false)
const isLoaded = ref(false)

const router = useRouter()

onMounted(() => {
  setTimeout(() => (isLoaded.value = true), 150)
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = () => {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Semua field harus diisi'
    return
  }

  loading.value = true

  setTimeout(() => {
    if (email.value === 'admin@gmail.com' && password.value === '123456') {
      localStorage.setItem('token', 'admin123')
      router.push('/admin')
    } else {
      error.value = 'Email atau password salah'
    }

    loading.value = false
  }, 1000)
}
</script>

<style scoped>

/* LAYOUT */
.login-page {
  display: flex;
  height: 100vh;
}

/* LEFT */
.login-left {
  flex: 1;
  background: url('@/assets/images/tarian.svg') center/cover no-repeat;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 40px;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.75),
    rgba(0,0,0,0.2)
  );
}

.left-content {
  position: relative;
  color: white;
  z-index: 2;
}

.left-content h1 {
  font-family: 'Playfair Display';
  font-size: 28px;
  margin-bottom: 10px;
}

.left-content p {
  font-size: 14px;
  opacity: 0.85;
}

/* RIGHT */
.login-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  padding: 20px;
}

/* FORM */
.login-form {
  width: 100%;
  max-width: 360px;
  opacity: 0;
  transform: translateY(20px);
  transition: 0.4s ease;
}

.login-form.show {
  opacity: 1;
  transform: translateY(0);
}

/* TITLE */
.login-form h2 {
  text-align: center;
  margin-bottom: 28px;
  font-weight: 600;
}

/* ERROR TEXT */
.error-text {
  text-align: center;
  color: #c0392b;
  font-size: 0.85rem;
  margin-bottom: 18px;
}

/* INPUT */
.input-group {
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 14px 16px;
  margin-bottom: 18px;
  background: white;
  transition: all 0.25s ease;
}

.input-group:focus-within {
  border-color: #a52a2a;
  box-shadow: 0 0 0 2px rgba(165,42,42,0.08);
}

/* ICON */
.icon {
  width: 18px;
  height: 18px;
  color: #999;
}

/* INPUT */
.input-group input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
}

/* PLACEHOLDER */
.input-group input::placeholder {
  color: #aaa;
}

/* EYE */
.eye {
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
}

/* 🔥 ERROR STATE */
.input-group.is-error {
  border-color: #c0392b;
  background: #fff5f5;
}

.input-group.is-error .icon {
  color: #c0392b;
}

.input-group.is-error input::placeholder {
  color: #c0392b;
}

/* FORGOT */
.forgot {
  text-align: right;
  font-size: 0.85rem;
  margin-bottom: 22px;
  color: #888;
  cursor: pointer;
}

.forgot:hover {
  color: #a52a2a;
}

/* BUTTON */
.btn-login {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: #a52a2a;
  color: white;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.25s ease;
}

.btn-login:hover {
  background: #8b1f1f;
  transform: translateY(-1px);
}

/* SPINNER */
.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid white;
  border-top: transparent;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* MOBILE */
@media (max-width: 992px) {
  .login-left {
    display: none;
  }

  .login-right {
    background: white;
  }
}

</style>