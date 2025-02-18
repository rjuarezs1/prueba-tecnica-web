<script setup>
import { useAuthStore } from "@/stores";
import { logout_handler } from "@/utils";
import { onBeforeMount } from "vue";
// import Swal from "sweetalert2"; // Import Swal
const auth = useAuthStore();

onBeforeMount(() => {
  logout_handler(auth);
});
</script>

<template>
  <h1>{{ auth.errors }}</h1>
</template>
