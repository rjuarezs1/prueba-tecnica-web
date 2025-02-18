<script setup>
import { onBeforeMount } from "vue";
import { useProductStore } from "@/stores";
import { useAuthStore } from "@/stores";
import MyProductTable from "@/components/MyProductTable.vue";

const product = useProductStore();
const auth = useAuthStore();

onBeforeMount(() => {
  product.get();
});
</script>

<template>
  <div v-if="auth.token === null" class="text-monospace text-center about">
    <h1>Usuario no autenticado.</h1>
  </div>
  <MyProductTable v-if="auth.token !== null" :list_of_products="product.data" />
</template>

<style>
.about {
  font-size: 3em;
  color: "#34495e";
}
</style>
