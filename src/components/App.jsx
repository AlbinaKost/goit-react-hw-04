import { useState } from 'react'
import React, { useEffect } from 'react';
import { getPhotos } from '../Services/API';
import './App.css'
import toast, { Toaster } from 'react-hot-toast';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import SearchBar from './SearchBar/SearchBar';
import ImageModal from './ImageModal/ImageModal';
import Loader from "./Loader/Loader";
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';



function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState({
    src: '',
    description: '',
  });

  useEffect(() => {
    if (!query) return;

    async function fetchPhotos() {
      try {
        setIsLoading(true);
        const data = await getPhotos(query, page);
        setTotalPages(data.total_pages);

        if (data.results.length > 0) setPhotos(p => [...p, ...data.results]);
        else toast.error('There are no results with such search!');
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPhotos();
  }, [page, query]);

  function handleQuery(resQuery) {
    setQuery(resQuery);
    setPage(1);
    setError(null);
    setPhotos([]);
    setTotalPages(0);
  }

  function handleLoadMore() {
    setPage(p => p + 1);
  }

  function handleModal(state, photo = {}) {
    setIsModalOpen(state);
    if (state) setSelectedPhoto(photo);
  }

  return (
    <>
      <SearchBar onSubmit={handleQuery} isLoading={isLoading} />
      <div className="container">
        {photos.length > 0 && !error && (
          <ImageGallery photos={photos} onSelect={handleModal} />
        )}
        {totalPages > page && !isLoading && !error && (
          <LoadMoreBtn onClick={handleLoadMore}>Load More</LoadMoreBtn>
        )}
        {error && <ErrorMessage />}
        {isLoading && !error && <Loader />}
      </div>
      <ImageModal
        isOpen={isModalOpen}
        photo={selectedPhoto}
        onChange={handleModal}
      />
      <Toaster position="top-right" />
    </>
  );
}

export default App;


