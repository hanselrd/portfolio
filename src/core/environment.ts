export const NODE_ENV = process.env.NODE_ENV;

export const BROWSER = typeof window !== "undefined";
export const DEV =
  NODE_ENV === "development" ||
  (process.env.VERCEL_GIT_COMMIT_REF && process.env.VERCEL_GIT_COMMIT_REF === "dev");

export const NEXT_PUBLIC_URL = process.env.VERCEL_GIT_COMMIT_REF
  ? process.env.VERCEL_GIT_COMMIT_REF === "dev"
    ? process.env.NEXT_PUBLIC_DEV_URL!
    : process.env.NEXT_PUBLIC_URL!
  : "http://localhost:3000";
