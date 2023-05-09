import { type FC } from "react";

// --- LOCALE / I18N
export type Locale = "fr";

export interface LocaleData {
  data: Record<string, string>;
  locale: Locale;
}
// ---

// --- INITIALIZER
export interface InitializerProps {
  setPlugin: (id: string) => void;
}

export type Initializer = FC<InitializerProps>;

export interface PluginRegistConfig {
  id: string;
  initializer: Initializer;
  isReady: boolean;
  name: string;
}
// ---

// --- MAIN
export interface BootstrapConfigurator {
  addSettingsLink: (sectionId: any, link: any) => void;
  addSettingsLinks: (sectionId: any, links: any) => void;
  getPlugin: (pluginId: any) => object;
  injectAdminComponent: (containerName: any, blockName: any, component: any) => void;
  injectContentManagerComponent: (containerName: any, blockName: any, component: any) => void;
  registerHook: (name: any, fn: any) => void;
}

type Components = any;
type Fields = any;
type Menu = any;
export interface RegisterConfigurator extends BootstrapConfigurator {
  addComponents: (components: any) => void;
  addCorePluginMenuLink: (link: any) => void;
  addFields: (fields: any) => void;
  addMenuLink(link: {
    Component: () => Promise<FC>;
    icon: FC;
    intlLabel: {
      defaultMessage: string;
      id: string;
    };
    permissions: object[];
    to: string;
  }): void;
  addMiddlewares: (middlewares: any) => void;
  addReducers: (reducers: any) => void;
  admin: { injectionZones: void };
  appPlugins: object;
  bootstrapAdmin: () => Promise<void>;
  configurations: { authLogo: string; head: void; locales: Locale[]; menuLogo: string; notifications: void };
  createCustomConfigurations: () => Promise<void>;
  createHook: (name: any) => void;
  createSettingSection: (section: any, links: any) => void;
  createStore: () => void;
  customBootstrapConfiguration: (_app: any) => void;
  customConfigurations: { locales: Locale[]; notifications: void };
  customFields: { customFields: void };
  getAdminInjectedComponents: (moduleName: any, containerName: any, blockName: any) => void;
  hooksDict: object;
  library: { components: Components; fields: Fields };
  menu: Menu[];
  middlewares: { middlewares: [] };
  plugins: object;
  reducers: object;
  registerPlugin: (pluginConf: PluginRegistConfig) => void;
  runHookParallel: (name: any) => void;
  runHookSeries: (name: any, asynchronous?: boolean) => void;
  runHookWaterfall: (name: any, initialValue: any, asynchronous?: boolean, store?: any) => void;
  settings: object;
  translations: object;
}

export interface RegisterTradsConfigurator {
  locales: Locale[];
}

export interface StrapiPlugin {
  bootstrap(app: BootstrapConfigurator): void;
  register(app: RegisterConfigurator): void;
  registerTrads(app: RegisterTradsConfigurator): Promise<LocaleData[]>;
}
// ---
