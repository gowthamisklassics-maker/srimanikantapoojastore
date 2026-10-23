import React from 'react';
import { useStore } from '../services/storeContext';

export default function ToastContainer() {
  const { toasts } = useStore();

  if (!toasts.length) return null;

  return (
    <div id="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type || 'default'}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
