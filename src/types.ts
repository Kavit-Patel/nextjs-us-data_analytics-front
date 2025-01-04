export interface IShortUrl {
  shortUrl?: string;
  createdAt?: string;
  message?: string;
}

export interface IUrl {
  id: string;
  longUrl: string;
  shortUrl: string;
  alias: string;
  createdAt: Date;
  expiresAt?: Date;
  topic: string;
}

export interface IUser {
  id: string;
  email: string;
  name?: string;
  googleId: string;
  createdAt: Date;
  urls: IUrl[];
}
