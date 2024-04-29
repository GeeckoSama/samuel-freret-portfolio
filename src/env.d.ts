/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly FIREBASE_SERVICE_ACCOUNT: json;
  readonly PUBLIC_FIREBASE_API_KEY: string;
  readonly PUBLIC_FIREBASE_AUTH_DOMAIN: string;
  readonly PUBLIC_FIREBASE_PROJECT_ID: string;
  readonly PUBLIC_FIREBASE_STORAGE_BUCKET: string;
  readonly PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly PUBLIC_FIREBASE_APP_ID: string;
  readonly PUBLIC_IMGIX_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
