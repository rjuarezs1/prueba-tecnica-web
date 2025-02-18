<script setup>
import MyDeleteProduct from "../components/MyDeleteProduct.vue";
import { useAuthStore } from "@/stores";

import { useRoute } from "vue-router";
const auth = useAuthStore();

const route = useRoute();
const { product_id } = route.params;
</script>

<template>
  <div v-if="auth.token === null" class="text-monospace text-center about">
    <h1>Usuario no autenticado.</h1>
  </div>
  <MyDeleteProduct v-if="auth.token !== null" :param="product_id" />
</template>
