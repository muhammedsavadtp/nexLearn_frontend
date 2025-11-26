import React, { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

const ResponsiveModal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "28rem",
  closeOnBackdrop = true,
}) => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  // Handle mount/unmount and animations
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setClosing(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setOpen(true));
      });
      document.body.style.overflow = "hidden";
    } else if (mounted) {
      setOpen(false);
      setClosing(true);
      const timer = setTimeout(() => {
        setMounted(false);
        setClosing(false);
        document.body.style.overflow = "";
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen, mounted]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!closeOnBackdrop) return;

      // Check if click is outside the modal content
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      // Use mousedown for better UX (closes immediately on click)
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }
  }, [isOpen, onClose, closeOnBackdrop]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0 }}
        aria-hidden="true"
      />

      {/* Modal Positioning Container */}
      <div className="fixed inset-0 flex items-end md:items-center md:justify-center md:p-4 overflow-y-auto">
        {/* Modal Content */}
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          style={{ "--modal-max-width": maxWidth }}
          className={`
            relative bg-white shadow-2xl flex flex-col max-h-[90vh]
            w-full rounded-t-3xl
            md:rounded-2xl md:max-w-[var(--modal-max-width)] md:mx-4
            overflow-hidden
            
            /* Animation */
            transition-all duration-300
            ${closing ? "duration-200" : "duration-350"}
            
            /* Mobile: Slide from bottom */
            ${open ? "translate-y-0" : "translate-y-full"}
            
            /* Desktop: Scale + Fade */
            ${
              open
                ? "md:translate-y-0 md:scale-100 md:opacity-100"
                : "md:translate-y-4 md:scale-[0.98] md:opacity-0"
            }
          `}
        >
          {/* Mobile Drag Handle */}
          <div className="flex justify-center pt-3 pb-1 md:hidden">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
            <h3
              id="modal-title"
              className="text-lg font-semibold text-gray-900"
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              className=" md:hidden
                group p-2 -mr-2 rounded-full text-gray-400 
                hover:bg-gray-100 hover:text-gray-600 
                active:bg-gray-200 active:scale-90
                transition-all duration-150
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
              "
              aria-label="Close modal"
            >
              <X
                size={20}
                strokeWidth={2.5}
                className="transition-transform duration-150 group-hover:rotate-90"
              />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto overscroll-contain">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveModal;
