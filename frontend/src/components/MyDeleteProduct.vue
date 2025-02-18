<script setup>
import { delOneProductStore } from "@/stores";
import { onBeforeMount, watch } from "vue";
import { delete_handler } from "@/utils";
import Swal from "sweetalert2"; // Import Swal

const delProduct = delOneProductStore();
const props = defineProps({
  param: String,
});

// Verifica el estado de la referencia errors del delOneProductStore
// mostrando un sweet alert de acuerdo al valor que persista durante la
// ejecución de la aplicación.
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

// Se envía la referencia y parametro correspondiente a la función que permite
// gestionar la eliminación de un producto en particular así como
// actualizar los estados del delOneProductStore.
onBeforeMount(() => {
  delete_handler(delProduct, props.param);
});
</script>

<template>
  <hr />
</template>
