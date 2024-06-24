'use client';
import { App_Admin } from '@/lib/types';
import { getSales } from '@/lib/actions';
import { useEffect, useState } from 'react';

export type App_Dashboard = {
  getSales: typeof getSales;
};

export default function Dashboard({ getSales }: App_Dashboard) {
  const [sales, setSales] = useState(0);

  useEffect(function () {
    const token = (JSON.parse(sessionStorage.getItem('user')!) as App_Admin)
      .token;

    const formdata = new FormData();
    formdata.set('token', token as string);

    getSales(null, formdata).then((order: any) => {
      const totalSales = order.results.reduce(function (
        prev: number,
        current: any
      ) {
        return prev + current.pricePaidInCents;
      },
      0);
      setSales(totalSales);
    });
  }, []);

  return (
    <main>
      <h1>Dashboard</h1>
      <h2>sales: {sales}</h2>
    </main>
  );
}
