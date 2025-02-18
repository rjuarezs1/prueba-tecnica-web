<script setup>
import { delOneProductStore } from "@/stores";
import { onBeforeMount, watch } from "vue";
import { delete_handler } from "@/utils";
import Swal from "sweetalert2"; // Import Swal

const delProduct = delOneProductStore();
const props = defineProps({
  param: String,
});

// verifica el valor de store delProduct.errors y muestra un sweet alert
function getAuthErrorsValue() {
  if (delProduct.errors === null) return;
  return delProduct.errors;
}

function handleErrorChange(newError) {
  if (newError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: newError,
    });
  }
}

watch(getAuthErrorsValue, handleErrorChange);

onBeforeMount(() => {
  delete_handler(delProduct, props.param);
});
</script>

<template>
  <hr />
</template>
