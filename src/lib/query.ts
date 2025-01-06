"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api, errroMessage } from "./axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IAllUrlData, ISingleUrlData, ITopicData, IUser } from "@/types";

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
  const { data: user, refetch } = useUserLogin();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      longUrl,
      customAlias,
      topic,
    }: {
      longUrl: string;
      customAlias: string;
      topic: string;
    }) => {
      try {
        const { data } = await api.post("/shorten", {
          longUrl,
          customAlias,
          topic,
        });
        queryClient.invalidateQueries({ queryKey: ["user"] });
        await refetch();
        queryClient.invalidateQueries({
          queryKey: ["allUrlAnalytics", "all"],
        });
        const topicName = user?.urls.find(
          (url) => url.shortUrl === data.shortUrl
        )?.topic.name;
        queryClient.invalidateQueries({
          queryKey: ["topicAnalytics", topicName],
        });
        toast.success("Created Successfully !");
        router.push("/myurls");
        return data;
      } catch (error) {
        console.log("Eror :", error);
        toast.error(errroMessage(error));
      }
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

export const useAllUrlAnalytics = (
  userId: string,
  alias: string,
  topic: string
) => {
  return useQuery<IAllUrlData, AxiosError>({
    queryKey: ["allUrlAnalytics", alias],
    queryFn: async () => {
      try {
        const data = await api.get(`/api/overall`);
        return data.data;
      } catch (error) {
        console.log("Error :", error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 15,
    retry: 1,
    enabled: !!userId && alias === "all" && !!!topic,
  });
};
export const useUrlAnalytics = (
  userId: string,
  alias: string,
  topic: string
) => {
  return useQuery<ISingleUrlData, AxiosError>({
    queryKey: ["urlAnalytics", alias],
    queryFn: async () => {
      try {
        const data = await api.get(`/analytics/${alias}`);
        return data.data;
      } catch (error) {
        console.log("Error :", error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 15,
    retry: 1,
    enabled: !!userId && alias !== "all" && !!!topic,
  });
};
export const useTopicAnalytics = (userId: string, topic: string) => {
  return useQuery<ITopicData, AxiosError>({
    queryKey: ["topicAnalytics", topic],
    queryFn: async () => {
      try {
        const data = await api.get(`/analytics/topic/${topic}`);
        return data.data;
      } catch (error) {
        console.log("Error :", error);
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 15,
    retry: 1,
    enabled: !!userId && !!topic,
  });
};
