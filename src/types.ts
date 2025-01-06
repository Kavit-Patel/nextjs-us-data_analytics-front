export interface IShortUrl {
  shortUrl?: string;
  createdAt?: string;
  message?: string;
}
export interface ITopic {
  id: string;
  name: string;
}
export interface IUrl {
  id: string;
  longUrl: string;
  shortUrl: string;
  alias: string;
  createdAt: Date;
  expiresAt?: Date;
  topic: ITopic;
}

export interface IUser {
  id: string;
  email: string;
  name?: string;
  googleId: string;
  createdAt: Date;
  urls: IUrl[];
}

export interface IAllOsType {
  osName: string;
  uniqueClicks: number;
  uniqueUsers: number;
}

export interface IAllDeviceType {
  deviceName: string;
  uniqueClicks: number;
  uniqueUsers: number;
}

export interface IAllUrlStats {
  date: string;
  clickCount: number;
}

export interface IAllClicksByDate {
  url: string;
  urlStats: IAllUrlStats[];
}

export interface IAllStats {
  totalUrls: number;
  totalClicks: number;
  uniqueUsers: number;
  clicksByDate: IAllClicksByDate[];
  osType: IAllOsType[];
  deviceType: IAllDeviceType[];
}

export interface IAllUrlData {
  currentUser: string;
  stats: IAllStats;
}

export interface ISingleUrlClickByDate {
  date: string;
  clickCount: number;
}

export interface ISingleUrlOsType {
  osName: string;
  uniqueClicks: number;
  uniqueUsers: number;
}

export interface ISingleUrlDeviceType {
  deviceName: string;
  uniqueClicks: number;
  uniqueUsers: number;
}

export interface ISingleUrlData {
  totalClicks: number;
  uniqueUser: number;
  clicksByDate: ISingleUrlClickByDate[];
  osType: ISingleUrlOsType[];
  deviceType: ISingleUrlDeviceType[];
}

export interface ITopicClickData {
  url: string;
  clickCount: number;
}

export interface ITopicDateData {
  [date: string]: ITopicClickData[];
}

export interface ITopicUrlSummary {
  shortUrl: string;
  totalClicks: number;
  uniqueClicks: number;
}

export interface ITopicData {
  totalClicks: number;
  uniqueUsers: number;
  clicksByDate: ITopicDateData[];
  urls: ITopicUrlSummary[];
}
