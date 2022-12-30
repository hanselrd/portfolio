export const NODE_ENV = process.env.NODE_ENV;

export const BROWSER = typeof window !== "undefined";
export const DEV =
  NODE_ENV === "development" ||
  (BROWSER && window.location.hostname.startsWith("dev")) ||
  (process.env.VERCEL_GIT_COMMIT_REF ? process.env.VERCEL_GIT_COMMIT_REF === "dev" : false);

export const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL!;
