declare module "tarteaucitronjs";

declare global {
  interface Window {
    tarteaucitron: {
      init(...args: unknown[]): void;
      initEvents: {
        loadEvent(oldBrowser: boolean): void;
      };
      userInterface: {
        openPanel(): void;
      };
    };
  }

  const tarteaucitron: typeof window.tarteaucitron;
}

export {};
