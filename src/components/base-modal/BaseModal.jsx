import css from './BaseModal.module.css';
import Modal from 'react-modal';
import icons from '../../assets/icons.svg';

Modal.setAppElement('#root');

const BaseModal = ({ isOpen, closeModal, styles, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={150}
      bodyOpenClassName={css.stopScrolling}
      className={css.modal}
      overlayClassName={{
        base: css.overlay,
        afterOpen: css.overlayAfterOpen,
        beforeClose: css.overlayBeforeClose,
      }}
      style={styles}
    >
      <button
        type="button"
        className={css.closeModalBtn}
        onClick={() => closeModal()}
      >
        <svg width={32} height={32} className={css.closeModalIcon}>
          <use href={`${icons}#close-modal`}></use>
        </svg>
      </button>
      {children}
    </Modal>
  );
};

export default BaseModal;
