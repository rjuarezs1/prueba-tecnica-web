<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "@/stores";
import { ref } from "vue";

// Instancia para la gestión de los estados de la aplicación, como la autenticación
// y el deslogueo de la aplicación.
const auth = useAuthStore();
const bg_color = ref("#34495e");
</script>

<template>
  <header>
    <nav class="navbar" :style="{ background: bg_color }">
      <div class="container-fluid">
        // Se utilizan los componentes de vue-router RouterLink y RouterView // para permitir la
        navegacion entre las diferentes rutas o vistas // configuradas en el servicio de router de
        la aplicación.
        <RouterLink class="navbar-brand text-white" to="/">Home</RouterLink>
        <RouterLink v-if="auth.token === null" class="nav-link active text-white" to="/signin"
          >SignIn</RouterLink
        >
        <RouterLink v-if="auth.token === null" class="nav-link text-white" to="/signup"
          >SignUp</RouterLink
        >
        <!-- el usuario podrá visualizar el siguiente link, una vez iniciada la sesión -->
        <RouterLink v-if="auth.token !== null" class="nav-link text-white" to="/products"
          >Productos</RouterLink
        >
        <!-- el usuario podrá visualizar el siguiente link, una vez iniciada la sesión -->
        <RouterLink v-if="auth.token !== null" class="nav-link text-white" to="/new_product"
          >Nuevo Producto</RouterLink
        >
        <!-- el usuario podrá visualizar el siguiente link, una vez iniciada la sesión -->
        <RouterLink v-if="auth.token !== null" class="nav-link text-white" to="/logout"
          >Log out</RouterLink
        >
      </div>
    </nav>
  </header>
  <hr />
  <RouterView />
</template>

// Algunos estilos css específicos para la vista principal de la aplicación App.vue
<style scoped>
.text-white {
  text-decoration: none;
}
</style>
