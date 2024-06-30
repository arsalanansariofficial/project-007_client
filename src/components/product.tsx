'use client';
import Link from 'next/link';
import Button from './button';
import { Each } from '@/lib/views';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import useRouterGuard from '@/hooks/useRouterGuard';
import { deleteFilesAdmin, getMediaLibraryAdmin } from '@/lib/actions';
import { IDENTIFIERS, REQUEST_BODY, ROUTES } from '@/lib/constants';
import { updateProductAdmin, uploadFilesAdmin } from '@/lib/actions';
import {
  App_Response,
  App_Response_File,
  App_Product_Public,
  App_Exception
} from '@/lib/types';

type App_Product_Component = {
  baseURL: string;
  product: App_Product_Public;
  uploadFilesAction: typeof uploadFilesAdmin;
  deleteFilesAction: typeof deleteFilesAdmin;
};

export default function Product({
  product,
  baseURL,
  uploadFilesAction,
  deleteFilesAction
}: App_Product_Component) {
  const token = useRouterGuard()?.token!;
  const productImages = product.attributes.imagePath.data.map(
    file => ({ ...file, ...file.attributes } as App_Response_File)
  );

  const [isOpen, setIsOpen] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [images, setImages] = useState(productImages);
  const [mediaLib, setMediaLib] = useState(productImages);

  function toggleMediaLib() {
    setIsOpen(isOpen => !isOpen);
  }

  function handleMediaIndex(index: number) {
    setIsOpen(true);
    setMediaIndex(index);
  }

  function handleImageUpdate(image: App_Response_File) {
    setIsOpen(false);
    setImages(function (images) {
      // creating a deep copy
      const updated = JSON.parse(JSON.stringify(images));
      updated[mediaIndex] = image;
      return updated;
    });
  }

  async function getMediaLibrary() {
    const formdata = new FormData();
    formdata.set(IDENTIFIERS.TOKEN, token);

    const response = (await getMediaLibraryAdmin(formdata)) as App_Response<
      App_Response_File[]
    >;

    setMediaLib(response.results);
    toggleMediaLib();
  }

  async function handleFilesUpload(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    const formdata = new FormData(event.currentTarget);
    formdata.set(IDENTIFIERS.TOKEN, token);

    const response = await uploadFilesAction(formdata);
    const exception = response as App_Exception;
    const files = response as App_Response_File[];

    if (!exception.status)
      setMediaLib(function (lib) {
        return [...files, ...lib];
      });
  }

  async function handleFilesDelete(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fileIds = [] as number[];
    const formdata = new FormData(event.target as HTMLFormElement);

    formdata.forEach(fd => fileIds.push(Number(fd)));
    formdata.set(IDENTIFIERS.TOKEN, token);
    formdata.set(
      REQUEST_BODY.DELETE_FILES_ADMIN.fileIds,
      JSON.stringify(fileIds)
    );

    const response = await deleteFilesAction(formdata);
    const exception = response as App_Exception;

    if (!exception.status)
      setMediaLib(function (mediLib) {
        return mediLib.filter(file => !fileIds.includes(file.id));
      });
  }

  return (
    <div key={product.id}>
      <dialog open={isOpen}>
        <form onSubmit={handleFilesUpload}>
          <input multiple id="files" type="file" name="files" />
          <button type="button" onClick={toggleMediaLib}>
            Close
          </button>
          <button type="submit">Upload</button>
        </form>
        <form onSubmit={handleFilesDelete}>
          <button type="submit">Delete Files</button>
          <Each
            of={mediaLib}
            render={function (image) {
              return (
                <div>
                  <img
                    width={200}
                    height={200}
                    key={image.id}
                    alt={product.attributes.description}
                    src={baseURL + image.url}
                    onClick={handleImageUpdate.bind(null, image)}
                  />
                  <input
                    type="checkbox"
                    name={String(image.id)}
                    value={image.id}
                  />
                </div>
              );
            }}
          />
        </form>
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
                src={baseURL + image.url}
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
        <button type="button" onClick={getMediaLibrary}>
          Media Library
        </button>
        <Button fallback="Applying..." type="submit" text="Apply Changes" />
      </form>
    </div>
  );
}
