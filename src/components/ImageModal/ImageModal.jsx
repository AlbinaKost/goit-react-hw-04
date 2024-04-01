import Modal from "react-modal";
import css from './ImageModal.module.css';

const ImageModal = ({ isOpen = false, photo, onChange }) => {
  Modal.setAppElement(document.getElementById('root'));
  return (
    <Modal
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={() => onChange(false)}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      preventScroll={true}
    >
      <img className={css.modalImg} src={photo.src} />
    </Modal>
  );
};

export default ImageModal;