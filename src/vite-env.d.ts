/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GHOST_API_KEY: string
  readonly PORT: string
  readonly BASE_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
