import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";

const activeApps = getApps();
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT ||
    import.meta.env.FIREBASE_SERVICE_ACCOUNT,
);

export const app =
  activeApps.length === 0
    ? initializeApp({
        credential: cert(serviceAccount as ServiceAccount),
      })
    : activeApps[0];
