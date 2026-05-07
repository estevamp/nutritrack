/// <reference types="vite/client" />

declare module 'virtual:pwa-register/react' {
  type RegisterSWOptions = {
    onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void;
    onRegisterError?: (error: Error) => void;
  };

  export function useRegisterSW(options?: RegisterSWOptions): {
    offlineReady: boolean;
    needUpdate: boolean;
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
  };
}
