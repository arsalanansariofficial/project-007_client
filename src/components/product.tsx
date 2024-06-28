import Link from 'next/link';
import { Each } from '@/lib/views';
import { ROUTES } from '@/lib/constants';
import {
  App_Response_File,
  App_Product_Public,
  App_Response_Data_Public
} from '@/lib/types';

type App_Product_Component = {
  baseURL: string;
  product: App_Product_Public;
};

function ImageComponent(
  baseURL: string,
  product: App_Product_Public,
  image: App_Response_Data_Public<App_Response_File>
) {
  return (
    <img
      width={200}
      height={200}
      key={image.id}
      alt={product.attributes.description}
      src={baseURL + image.attributes.url}
    />
  );
}

export default function Product({ product, baseURL }: App_Product_Component) {
  return (
    <div key={product.id}>
      <Each
        of={product.attributes.imagePath.data}
        render={function (image) {
          return (
            <Link href={ROUTES.PRODUCTS + product.id}>
              <img
                width={200}
                height={200}
                key={image.id}
                alt={product.attributes.description}
                src={baseURL + image.attributes.url}
              />
            </Link>
          );
        }}
      />
      <p>id: {product.id}</p>
      <h3>name: {product.attributes.name}</h3>
      <p>description: {product.attributes.description}</p>
      <p>price: Rs. {product.attributes.priceInCents}</p>
    </div>
  );
}
