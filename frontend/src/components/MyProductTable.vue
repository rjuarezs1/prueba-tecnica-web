<script setup>
import { ref, watch, nextTick } from "vue";
import DataTable from "datatables.net-dt"; // Import DataTables CSS and JS
import { useAuthStore, ivaOneProductStore } from "@/stores";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const ivaStore = ivaOneProductStore();

function showTax(name, price) {
  ivaStore.setPrice(price);
  ivaStore.getIva(name);
}

const table = ref(null);

const props = defineProps({
  list_of_products: Object,
});

watch(
  () => props.list_of_products,
  (newList) => {
    if (newList && newList.body && newList.body.length > 0) {
      nextTick(() => {
        if (table.value) {
          table.value.clear().destroy(); // Clear and destroy previous DataTable instance if it exists
        }
        table.value = new DataTable("#example", {
          responsive: true,
          paging: true,
          searching: true,
          info: true,
          stateSave: true, // Enable state saving
        });
      });
    }
  }
);
</script>

<template>
  <div v-if="auth.token !== null" class="col-6 text-truncate">
    {{ auth.token }}
  </div>
  <div class="container mt-3">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="table-responsive">
          <table id="example" class="table table-striped nowrap" style="width: 100%">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>IVA</th>
                <th>Calc</th>
                <th>Stock</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in props.list_of_products.body" :key="item.product_id">
                <th>{{ index }}</th>
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.price }}</td>
                <td>{{ (item.price * 0.12).toFixed(2) }}</td>
                <td>
                  <div class="d-flex">
                    <button
                      type="button"
                      class="btn btn-sm"
                      id="iva-check-button"
                      @click="showTax(item.name, item.price)"
                    >
                      <img src="../assets/price_check_24dp_text_white.svg" alt="price check icon" />
                    </button>
                  </div>
                </td>
                <td>{{ item.stock }}</td>
                <td>
                  <div class="d-flex gap-2">
                    <button
                      type="button"
                      class="btn btn-sm"
                      id="product-edit-button"
                      @click="router.push(`/put_products/${item.product_id}`)"
                    >
                      <img src="../assets/edit_24dp.svg" alt="edit icon" />
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm"
                      id="product-delete-button"
                      @click="router.push(`/del_products/${item.product_id}`)"
                    >
                      <img src="../assets/delete_24dp_text_white.svg" alt="delete icon" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#product-edit-button {
  background: #41b883;
}

#product-delete-button {
  background: #34495e;
}

#iva-check-button {
  background: #ff2a0c;
}
</style>
