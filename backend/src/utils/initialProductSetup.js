import Product from "../models/product.models";
import { faker, fakerSK } from "@faker-js/faker";

export const generate_random_products = async () => {
  await Product.sync();
  const { count } = await Product.findAndCountAll();
  if (count >= 1) return;
  const products = Array.from({ length: 5 }).map(() => ({
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price({ min: 100, max: 200, dec: 2 }),
    stock: faker.datatype.boolean(),
  }));

  // Insertar los registros en la base de datos
  await Product.bulkCreate(products);

  console.log("5 registros aleatorios generados con éxito.");
  // process.exit();
};
