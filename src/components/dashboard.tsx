'use client';
import { getSales } from '@/lib/actions';
import { useEffect, useState } from 'react';
import { retrieveObject } from '@/lib/utils';
import { IDENTIFIERS } from '@/lib/constants';
import { App_Admin, App_Order, App_Response, App_User } from '@/lib/types';

export type App_Dashboard = {
  getSales: typeof getSales;
};

export default function Dashboard({ getSales }: App_Dashboard) {
  const [sales, setSales] = useState(0);
  const [products, setProducts] = useState([]);
  const [averageValue, setAverageValue] = useState(0);
  const [orders, setOrders] = useState<App_Order[]>([]);
  const [customers, setCustomers] = useState<App_User[]>([]);
  const [inactiveProducts, setInactiveProducts] = useState([]);

  useEffect(function () {
    const token = retrieveObject<App_Admin>(IDENTIFIERS.USER).token;

    const formdata = new FormData();
    formdata.set(IDENTIFIERS.TOKEN, token as string);

    getSales(null, formdata).then((response: App_Response) => {
      let sales = 0;
      let customers = [];
      let averageValue = 0;
      let isExisting = false;
      let orders = response.results as App_Order[];

      for (const order of orders) {
        sales += order.pricePaidInCents;
        isExisting = !!customers.find(user => user.id === order.user.id);
        if (!isExisting) customers.push(order.user);
      }

      averageValue = sales / orders.length;
      setSales(sales);
      setOrders(orders);
      setCustomers(customers);
      setAverageValue(averageValue);
    });
  }, []);

  return (
    <main>
      <h1>Dashboard</h1>
      <p>sales: {sales}</p>
      <p>orders: {orders.length}</p>
      <p>average value: {averageValue}</p>
      <p>customers: {customers.length}</p>
      <p>products: {products.length}</p>
      <p>inactive products: {inactiveProducts.length}</p>
    </main>
  );
}
