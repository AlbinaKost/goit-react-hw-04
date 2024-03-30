import { useState } from 'react'
import React, { useEffect } from 'react';
import axios from "axios";
import './App.css'
import SearchBar from './SearchBar/SearchBar';
import LoadingLSpinner from "./Loader/Loader";
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';


const App = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
  
    useEffect(() => {
      if (!query) return;
  
      const fetchImages = async () => {
        setIsLoading(true);
  
        try {
          const response = await axios.get(
            `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=12&client_id=GlsOaQzd2KBOSQCF-_6LiDT3UFMeZCJo042ItLtEPKo`
          );
          if (response.data.results.length === 0)
            toast("There are no images found to your request");
          setImages((prevImages) => [...prevImages, ...response.data.results]);
        } catch (error) {
          setError("Something went wrong. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchImages();
    }, [query, page]);
  
    const handleSearchSubmit = (newQuery) => {
      setImages([]);
      setQuery(newQuery);
      setPage(1);
      setError(null);
    };
  
    const handleLoadMoreClick = () => {
      if (!query) {
        toast.error("Please enter a search term");
        return;
      }
  
      setIsLoading(true);
      setPage((prevPage) => prevPage + 1);
    };
  
    return (
      <div>
        <SearchBar onSubmit={handleSearchSubmit} />
        {error && <ErrorMessage message={error} />}
        {images.length > 0 && <ImageGallery images={images} />}
        {isLoading && (
          <LoadingLSpinner
            type="ThreeDots"
            color="#00BFFF"
            height={80}
            width={80}
          />
        )}
        {images.length > 0 && !isLoading && (
          <LoadMoreBtn onClick={handleLoadMoreClick} />
        )}
      </div>
    );
  };
  
  export default App;
// KydTzyXYhyMgRFAiaKOzxHOF_hoeB90UournbjC14Io ключ 