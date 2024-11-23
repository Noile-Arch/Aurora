import { motion } from "framer-motion";
import Button from "./Button";

type ModalProps = {
  handleModalClose: () => void;
  closeTitle: string;
  buttonTitle: string;
  acknowledgment: string;
  notice: string;
  modalTitle: string;
  children: React.ReactNode;
};

const Modal = ({
  handleModalClose,
  closeTitle,
  buttonTitle,
  acknowledgment,
  notice,
  modalTitle,
  children,
}: ModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      className="fixed h-screen inset-0 flex flex-col items-center justify-center bg-[rgba(0,0,0,0.8)] p-6 text-[#EDEADE] mt-0 ml-0"
    >
      <div className="w-full md:max-w-md h-auto bg-primary rounded-md p-4 flex flex-col gap-4 justify-between">
        <h1 className="text-2xl text-start">{modalTitle}</h1>
        {children}

        {/* Notice to Users */}
        <p className="text-start text-sm">
          <span className="text-[#FF5252]">**Important Notice**</span>{" "}:{notice}
        </p>

        {/* Acknowledgment Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="checkbox"
            id="acknowledge"
            className="accent-[#ECEAE2] focus:accent-[#98fb98] size-4 rounded-md mr-2"
          />
          <label htmlFor="acknowledge" className="text-sm">
            {acknowledgment}
          </label>
        </div>
        <div className="flex flex-row gap-4">
          <div
            onClick={handleModalClose}
            role="button"
            className="w-full h-auto p-4 items-center justify-center flex text-[black] font-semibold capitalize bg-[#FF5252] rounded-lg cursor-pointer text-md"
          >
            {closeTitle}
          </div>
          <Button href="" title={buttonTitle} />
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;
