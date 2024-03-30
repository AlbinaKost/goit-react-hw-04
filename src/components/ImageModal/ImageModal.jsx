import Modal from "react-modal";
const ImageModal = ({ modalIsOpen, closeModal, image }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
      style={{
        content: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // width: "100vw",
          // height: "100vh",
          // border: "none",
          // inset: "0px",
          // padding: "0px",
          // background: "black",
        },
      }}
    >
      <img
        src={image.urls.full}
        alt={image.description}
        style={{
          maxHeight: "100vh",
          maxWidth: "100vw",
        }}
      />
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
};
export default ImageModal;