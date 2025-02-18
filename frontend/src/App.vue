<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "@/stores";
import { ref } from "vue";
const auth = useAuthStore();
const bg_color = ref("#34495e");
</script>

<template>
  <header>
    <nav class="navbar" :style="{ background: bg_color }">
      <div class="container-fluid">
        <RouterLink class="navbar-brand text-white" to="/">Home</RouterLink>
        <RouterLink v-if="auth.token === null" class="nav-link active text-white" to="/signin"
          >SignIn</RouterLink
        >
        <RouterLink v-if="auth.token === null" class="nav-link text-white" to="/signup"
          >SignUp</RouterLink
        >
        <RouterLink v-if="auth.token !== null" class="nav-link text-white" to="/products"
          >Productos</RouterLink
        >
        <RouterLink v-if="auth.token !== null" class="nav-link text-white" to="/new_product"
          >Nuevo Producto</RouterLink
        >
        <RouterLink v-if="auth.token !== null" class="nav-link text-white" to="/logout"
          >Log out</RouterLink
        >
      </div>
    </nav>
  </header>
  <hr />
  <RouterView />
</template>

<style scoped>
.text-white {
  text-decoration: none;
}
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
