import Product from './product';
import Exception from './exception';
import { Show, Each } from '@/lib/views';
import { getProducts } from '@/lib/actions';
import {
  App_Exception,
  App_Product_Public,
  App_Response_Public
} from '@/lib/types';

type App_Products_Component = {
  baseURL: string;
};

type App_Response_Products =
  | App_Exception
  | App_Response_Public<App_Product_Public[]>;

export default async function Products({ baseURL }: App_Products_Component) {
  const response = (await getProducts()) as App_Response_Products;
  const _exception = response as App_Exception;
  const exception = _exception.status ? _exception : null;
  const products = (response as App_Response_Public<App_Product_Public[]>).data;

  return (
    <main>
      <Show>
        <Show.When isTrue={!!exception}>
          <Exception exception={exception} />
        </Show.When>
        <Show.Else>
          <Each
            of={products}
            render={function (product) {
              return (
                <Product key={product.id} product={product} baseURL={baseURL} />
              );
            }}
          />
        </Show.Else>
      </Show>
    </main>
  );
}
