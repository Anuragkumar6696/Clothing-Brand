import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ToastMessage, ToastType } from '../types';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastContextValue {
  showToast: (title: string, message?: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((title: string, message?: string, type: ToastType = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { id, title, message, type };

    setToasts((prev) => [...prev.slice(-3), newToast]); // keep at most 4 active

    setTimeout(() => {
      removeToast(id);
    }, 3800);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      
      {/* Toast Notification Container */}
      <div 
        aria-live="polite" 
        className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="alert"
            className="pointer-events-auto flex items-start gap-3 p-4 bg-white/95 backdrop-blur-md border border-[#E7E2D6] shadow-xl rounded-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-[#C25E38]" />}
              {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-600" />}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1A1918] leading-tight">{toast.title}</p>
              {toast.message && (
                <p className="text-xs text-[#736E66] mt-0.5 leading-snug">{toast.message}</p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#736E66] hover:text-[#1A1918] transition-colors p-1 -mr-1 -mt-1 rounded-md"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

