"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import Button from "../Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: -50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -50, scale: 0.95 },
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message = "Are you sure you want to delete this task?",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed left-72 top-20 inset-0 bg-black/74 flex justify-center items-center z-50"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8 border-2 border-red-400"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col items-center space-y-4 mb-6">
              <div className="bg-red-100 text-red-600 rounded-full p-4">
                <AlertTriangle className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 text-center">
                Warning!
              </h3>
            </div>

            <p className="text-gray-700 text-center mb-6">{message}</p>

            <div className="flex justify-center space-x-4">
              <Button
                variant="secondary"
                className="px-6 py-2"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                Delete
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
