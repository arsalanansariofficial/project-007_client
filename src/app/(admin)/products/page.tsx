import processEnv from '../../../../next-env';
import Products from '@/components/products';

export default async function ProductsPage() {
  return <Products baseURL={processEnv.BASE_URL} />;
}
