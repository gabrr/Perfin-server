declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    UPLOAD_DIR: string;
    DATABASE_URL: string;
  }
}
