import { useState } from "react";
import ImageModal from "../ImageModal/ImageModal";

const ImageCard = ({ image }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <img
        src={image.urls.small}
        alt={image.description}
        onClick={openModal}
        style={{ width: "20vw", height: "35vh" }}
      />
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        image={image}
      />
    </div>
  );
};

export default ImageCard;