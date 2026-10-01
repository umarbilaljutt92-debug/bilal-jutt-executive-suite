type ToastListener = (message: string, type?: 'info' | 'success' | 'gold' | 'error') => void;

let listeners: ToastListener[] = [];

export const showExecutiveToast = (
  message: string,
  type: 'info' | 'success' | 'gold' | 'error' = 'gold'
) => {
  listeners.forEach((listener) => listener(message, type));
};

export const subscribeToast = (listener: ToastListener) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};
