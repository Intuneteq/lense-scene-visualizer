type Result<T> = {
  code: number;
  message: string;
  data: T;
};

type FetchOptions = RequestInit & {
  responseType?: "json" | "blob" | "text";
};
