"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api, errroMessage } from "./axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IUser } from "@/types";

export const useUserLogin = () => {
  return useQuery<IUser, AxiosError>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const data = await api.get(`/auth/user`);
        return data.data;
      } catch (error) {
        console.log("Error :", error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 15,
    retry: 1,
  });
};

export const useShortUrl = () => {
  const router = useRouter();
  const { refetch } = useUserLogin();
  return useMutation({
    mutationFn: async ({
      longUrl,
      customAlias,
    }: {
      longUrl: string;
      customAlias: string;
    }) => {
      try {
        await api.post("/shorten", { longUrl, customAlias });
        await refetch();
        router.push("/myurls");
      } catch (error) {
        console.log("Eror :", error);
        toast.error(errroMessage(error));
      }
    },
    onSuccess: async () => {
      await refetch();
      router.push("/myurls");
    },
    onError: (err) => {
      toast.error(errroMessage(err));
      router.push("/");
    },
  });
};

export const useUserLogOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        const { data } = await api.get(`/auth/logout`);
        queryClient.removeQueries({ queryKey: ["user"] });
        toast.success("Logged Out Successfully !");
        return data;
      } catch (error) {
        toast.error(errroMessage(error));
      }
    },
  });
};

export const useDeleteUrlById = () => {
  const { refetch } = useUserLogin();
  const router = useRouter();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await api.get(`/url/${id}`);
        refetch();
        router.push("/myurls");
      } catch (error) {
        toast.error(errroMessage(error));
      }
    },
  });
};
