declare module "orejime";

declare global {
  interface Window {
    Orejime: {
      init: (...args: unknown[]) => { show(): void };
      show(): void;
    };
  }

  const Orejime: typeof window.Orejime;
}

export {};
