"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success", duration = 4000) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}a
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const Toast = ({ toast, onClose }) => {
  const styles = {
    success: {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: <CheckCircle size={16} />,
    },
    error: {
      bg: "bg-red-100",
      text: "text-red-700",
      icon: <AlertCircle size={16} />,
    },
  };

  const style = styles[toast.type];

  return (
    <div
      className={`flex items-start gap-2 min-w-[280px] max-w-sm p-3 rounded-lg shadow-lg ${style.bg} ${style.text}`}
    >
      {style.icon}

      <span className="flex-1 text-sm">{toast.message}</span>

      <button onClick={onClose} className="opacity-70 hover:opacity-100">
        <X size={16} />
      </button>
    </div>
  );
};

export const useToast = () => useContext(ToastContext);
