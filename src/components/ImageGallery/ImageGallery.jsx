import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images,onImageClick }) => {
  const handleImageClick = (image) => {
    if (onImageClick) {
      onImageClick(image);
    }
  };
  return (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        listStyle: "none",
        gap: "15px",
        paddingTop: "50px",
      }}
    >
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;