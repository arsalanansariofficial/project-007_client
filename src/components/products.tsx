import Link from 'next/link';
import processEnv from '../../next-env';
import { Show, Each } from '@/lib/views';
import { ROUTES } from '@/lib/constants';
import { getProducts } from '@/lib/actions';
import {
  App_Exception,
  App_Product_Public,
  App_Response_Public
} from '@/lib/types';

type App_Response_Products =
  | App_Exception
  | App_Response_Public<App_Product_Public[]>;

export default async function Products() {
  const response = (await getProducts()) as App_Response_Products;
  const _exception = response as App_Exception;
  const exception = _exception.status ? _exception : null;
  const products = (response as App_Response_Public<App_Product_Public[]>).data;

  return (
    <main>
      <Show>
        <Show.When isTrue={!!exception}>
          <p>{exception?.status}</p>
          <p>{exception?.message}</p>
          <Show>
            <Show.When isTrue={!!exception?.details?.errors?.length}>
              <Each
                of={exception?.details?.errors || []}
                render={function (exception, index) {
                  return <p key={index}>{exception.message}</p>;
                }}
              />
            </Show.When>
          </Show>
        </Show.When>
        <Show.Else>
          <Each
            of={products}
            render={function (product) {
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
                            src={processEnv.BASE_URL + image.attributes.url}
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
            }}
          />
        </Show.Else>
      </Show>
    </main>
  );
}
