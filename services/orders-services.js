const fs = require("fs/promises");
const path = require('path');
const { nanoid } = require("nanoid");



const ordersPath = path.join(__dirname, "../db/chese-market/orders.json");

const getAll = async () => {
  const orders = await fs.readFile(ordersPath, "utf-8");
  return JSON.parse(orders);
}
const add = async ({ name, phone, items }) => {
  const orders = await getAll();
  const newOrder = {
    id: nanoid(),
    name,
    phone,
    items,
    date: new Date().toISOString(),
    status: "pending",
    delivery: {"method": "courier", "address": "Vinnytsia, Main St. 10"}
  };
  orders.push(newOrder);
  await fs.writeFile(ordersPath, JSON.stringify(contacts, null, 2));
  return newOrder;
}


module.exports = {
  getAll,
  add,
}