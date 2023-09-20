import React from 'react';
import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';

import { Button } from './Button/Button';
import { getRequest } from './Services/getRequest';
import toast, { Toaster } from 'react-hot-toast';
import { CircleLoader } from 'react-spinners';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      return;
    }
    async function fetchData() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getRequest(query.trim(), page);
        setImages(prevImages => {
          return [...prevImages, ...data.hits];
        });

        setVisible(page === Math.ceil(data.totalHits / 12) ? false : true);
      } catch (error) {
        setError(true);
        toast('Oops, error!');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [page, query]);

  const handleSubmit = query => {
    if (!query.trim()) {
      return;
    }
    setImages([]);
    setPage(1);
    setQuery(query);
  };
  const onLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      {!error && (
        <div>
          <Searchbar onSubmit={handleSubmit} />
          <CircleLoader color="#36d7b7" loading={isLoading} />

          <Modal />
          <ImageGallery images={images} />

          {visible && <Button onLoadMore={onLoadMore} />}
          <Toaster />
        </div>
      )}
    </>
  );
};
