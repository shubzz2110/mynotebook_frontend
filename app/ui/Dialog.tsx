"use client";
import { motion, AnimatePresence } from "framer-motion";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function Dialog({
  isOpen,
  onClose,
  children,
  className = "",
}: DialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm cursor-default"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.25 }}
            className={`bg-white shadow-sm relative max-h-[90vh] max-w-[90vw] rounded-2.5xl ${className} flex flex-col`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
