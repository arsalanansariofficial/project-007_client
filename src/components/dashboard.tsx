'use client';
import Link from 'next/link';
import { retrieveObject } from '@/lib/utils';
import { getProducts, getSales } from '@/lib/actions';
import { IDENTIFIERS, ROUTES } from '@/lib/constants';
import { useCallback, useEffect, useState } from 'react';
import {
  App_User,
  App_Admin,
  App_Order,
  App_Response,
  App_Exception,
  App_Product_Public,
  App_Response_Public
} from '@/lib/types';

export type App_Dashboard = {
  getSales: typeof getSales;
};

export default function Dashboard({ getSales }: App_Dashboard) {
  const [sales, setSales] = useState(0);
  const [averageValue, setAverageValue] = useState(0);
  const [orders, setOrders] = useState<App_Order[]>([]);
  const [customers, setCustomers] = useState<App_User[]>([]);
  const [exception, setException] = useState<App_Exception>();
  const [products, setProducts] = useState<App_Product_Public[]>([]);
  const [inactiveProducts, setInactiveProducts] = useState<
    App_Product_Public[]
  >([]);

  const init = useCallback(async function init(formdata: FormData) {
    const [salesResponse, productsResponse]: [
      App_Response<App_Order[]> | App_Exception,
      App_Response_Public<App_Product_Public[]> | App_Exception
    ] = await Promise.all([getSales(null, formdata), getProducts()]);

    let exception;
    const salesException = salesResponse as App_Exception;
    const productsException = productsResponse as App_Exception;

    // Handling exceptions
    if (salesException.status) exception = salesException;
    if (productsException.status) exception = productsException;
    if (exception?.status) return setException(exception);

    let sales = 0;
    let customers = [];
    let averageValue = 0;
    let isExisting = false;
    let orders = (salesResponse as App_Response<App_Order[]>).results;

    //  Handling Sales Data
    for (const order of orders) {
      sales += order.pricePaidInCents;
      isExisting = !!customers.find(user => user.id === order.user.id);
      if (!isExisting) customers.push(order.user);
    }

    averageValue = sales / orders.length;

    const acitveProducts = [];
    const inactiveProducts = [];
    const products = (
      productsResponse as App_Response_Public<App_Product_Public[]>
    ).data;

    //  Handling Products Data
    for (const product of products) {
      if (product.attributes.isAvailableForPurchase)
        acitveProducts.push(product);
      else inactiveProducts.push(product);
    }

    //  Updating Sales Data
    setSales(sales);
    setOrders(orders);
    setCustomers(customers);
    setAverageValue(averageValue);

    //  Updating Products Data
    setProducts(products);
    setInactiveProducts(inactiveProducts);
  }, []);

  useEffect(function () {
    const formdata = new FormData();

    formdata.set(
      IDENTIFIERS.TOKEN,
      retrieveObject<App_Admin>(IDENTIFIERS.USER)?.token as string
    );

    init(formdata);
  }, []);

  return (
    <>
      <header>
        <h1>Dashboard</h1>
        <nav>
          <ul>
            <li>
              <Link href={ROUTES.SALES}>Sales</Link>
            </li>
            <li>
              <Link href={ROUTES.PRODUCTS}>Products</Link>
            </li>
            <li>
              <Link href={ROUTES.ORDERS}>Orders</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {exception && (
          <>
            <p>{exception.status}</p>
            <p>{exception.message}</p>
            {exception.details.errors?.map(function (exception) {
              return <p>{exception.message}</p>;
            })}
          </>
        )}
        {!exception && (
          <>
            <p>sales: {sales}</p>
            <p>orders: {orders.length}</p>
            <p>average value: {averageValue}</p>
            <p>customers: {customers.length}</p>
            <p>products: {products.length}</p>
            <p>inactive products: {inactiveProducts.length}</p>
          </>
        )}
      </main>
    </>
  );
}
