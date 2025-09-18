import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useMainContext } from "../context";

export default function ModalLayout({ label, children }) {
  const { onClose } = useMainContext();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-full max-w-[550px] mx-auto bg-white rounded-2xl shadow-2xl max-h-[90%] overflow-y-auto border border-gray-200"
          initial={{ y: 100, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 100, scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 transition-transform transform hover:rotate-90"
            >
              <FiX size={22} />
            </button>
          </div>

          <div className="px-7 py-6">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}