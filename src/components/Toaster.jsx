import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'white',
          color: '#333',
          border: '1px solid #e5e5e5',
        },
        className: 'toast',
        duration: 4000,
      }}
      richColors
    />
  );
}
