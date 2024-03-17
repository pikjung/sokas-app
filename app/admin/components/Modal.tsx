import { LiaPaperPlane } from "react-icons/lia";
import Button from "./Button";

interface ModalProps {
  header: string;
  children: React.ReactNode;
  formHandler?: () => void;
  idName: string;
}

const Modal: React.FC<ModalProps> = ({
  header,
  children,
  formHandler,
  idName,
}) => {
  return (
    <dialog id={idName} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">{header}</h3>
        {children}
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
