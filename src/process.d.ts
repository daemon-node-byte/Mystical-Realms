declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CI: string;
      VERCEL_ENV: string;
    }
  }
}

export {};