/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_RAPIDAPI_URL: string;
  // Add other environment variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
