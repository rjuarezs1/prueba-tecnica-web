<script setup>
import { useAuthStore } from "@/stores";
// Permite renderizar el componente card de la vista HomeView.vue
// que esta configurada como ruta principal o "/"
import MyWelcome from "@/components/MyWelcome.vue";
// Instancia para la gestión de los estados de la aplicación, como la autenticación
// y el deslogueo de la aplicación.
const auth = useAuthStore();
</script>

<template>
  <!-- HomeView.vue forma parte de la ruta principal por lo que la misma
     se renderizará independiente del valor null del estado token del useAuthStore -->
  <main>
    <MyWelcome v-if="auth.token !== null || auth.token === null" />
  </main>
</template>
