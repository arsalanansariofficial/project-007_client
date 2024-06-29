'use client';
import Link from 'next/link';
import Button from './button';
import { useState } from 'react';
import { Each } from '@/lib/views';
import { ROUTES } from '@/lib/constants';
import { updateProductAdmin } from '@/lib/actions';
import useRouterGuard from '@/hooks/useRouterGuard';
import {
  App_Response_File,
  App_Product_Public,
  App_Response_Data_Public
} from '@/lib/types';

type App_Product_Component = {
  baseURL: string;
  product: App_Product_Public;
  updateProduct: typeof updateProductAdmin;
};

export default function Product({
  product,
  baseURL,
  updateProduct
}: App_Product_Component) {
  const token = useRouterGuard()?.token!;
  const [isOpen, setIsOpen] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [images, setImages] = useState(product.attributes.imagePath.data);
  const [mediaLib, setMediaLib] = useState(product.attributes.imagePath.data);

  function toggleMediaLib() {
    setIsOpen(isOpen => !isOpen);
  }

  function handleMediaIndex(index: number) {
    setIsOpen(true);
    setMediaIndex(index);
  }

  function handleImageUpdate(
    image: App_Response_Data_Public<App_Response_File>
  ) {
    setIsOpen(false);
    setImages(function (images) {
      // creating a deep copy
      const updated = JSON.parse(JSON.stringify(images));
      updated[mediaIndex] = image;
      return updated;
    });
  }

  return (
    <div key={product.id}>
      <dialog open={isOpen}>
        <Each
          of={mediaLib}
          render={function (image, index) {
            return (
              <img
                width={200}
                height={200}
                key={image.id}
                alt={product.attributes.description}
                src={baseURL + image.attributes.url}
                onClick={handleImageUpdate.bind(null, image)}
              />
            );
          }}
        />
      </dialog>
      <Each
        of={images}
        render={function (image, index) {
          return (
            <Link href={ROUTES.PRODUCTS + product.id}>
              <img
                width={200}
                height={200}
                key={image.id}
                alt={product.attributes.description}
                src={baseURL + image.attributes.url}
                onClick={handleMediaIndex.bind(null, index)}
              />
            </Link>
          );
        }}
      />
      <form action={updateProductAdmin.bind(null, token, product, images)}>
        <div className="form-control">
          <label htmlFor="product-id">Product ID</label>
          <input
            disabled
            type="text"
            id="product-id"
            name="product-id"
            placeholder={String(product.id)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            placeholder={product.attributes.name}
          />
        </div>
        <div className="form-control">
          <label htmlFor="product-description">Product Description</label>
          <input
            type="text"
            id="product-description"
            name="product-description"
            placeholder={product.attributes.description}
          />
        </div>
        <div className="form-control">
          <label htmlFor="product-price">Product Price</label>
          <input
            type="text"
            id="product-price"
            name="product-price"
            placeholder={String(product.attributes.priceInCents)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="product-availability">Product Availability</label>
          <select name="product-availability" id="product-availability">
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
        <button type="button" onClick={toggleMediaLib}>
          Media Library
        </button>
        <Button fallback="Applying..." type="submit" text="Apply Changes" />
      </form>
    </div>
  );
}
