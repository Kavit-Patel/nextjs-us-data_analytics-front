import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

export const errroMessage = (err: AxiosError | Error | unknown) => {
  if (err instanceof AxiosError && err.response) {
    const message = err.response.data?.message;
    return message instanceof Array ? message.join(", ") : message;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return "Something Went Wrong !";
};
