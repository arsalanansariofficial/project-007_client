import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export default function Header() {
  return (
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
  );
}
