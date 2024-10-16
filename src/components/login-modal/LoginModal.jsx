import BaseModal from '../base-modal/BaseModal';
import LoginForm from '../login-form/LoginForm';

const LoginModal = ({ isOpen, closeModal }) => {
  return (
    <BaseModal
      isOpen={isOpen}
      closeModal={closeModal}
      styles={{ content: { maxWidth: '566px' } }}
    >
      <LoginForm closeModal={closeModal} />
    </BaseModal>
  );
};

export default LoginModal;
