import Modal from "../Modal/Modal";
import LoginForm from "./LoginForm";

type Props = {
  onClose: () => void;
  open: boolean;
};

export default function LoginModalForm({ ...props }: Props) {
  return (
    <Modal {...props} modalBoxClassName="pb-20">
      <LoginForm />
    </Modal>
  );
}
