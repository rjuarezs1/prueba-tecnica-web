import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import ProductView from "@/views/ProductView.vue";
import NewProductView from "@/views/NewProductView.vue";
import UpdateProductView from "../views/UpdateProductView.vue";
import DeleteProductView from "../views/DeleteProductView.vue";
import LogOutView from "@/views/LogOutView.vue";
import NotFoundView from "../views/NotFoundView.vue";

// Configuración del routing de la aplicación mediante vue-router y las
// Vistas creadas para la navegación.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/signin",
      name: "signin",
      component: SignIn,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
    {
      path: "/products",
      name: "products",
      component: ProductView,
    },
    {
      path: "/new_product",
      name: "new_product",
      component: NewProductView,
    },
    {
      path: "/put_products/:product_id",
      name: "put_product",
      component: UpdateProductView,
    },
    {
      path: "/del_products/:product_id",
      name: "del_product",
      component: DeleteProductView,
    },
    {
      path: "/logout",
      name: "logout",
      component: LogOutView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
