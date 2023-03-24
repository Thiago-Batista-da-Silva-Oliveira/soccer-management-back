export interface ICacheProvider {
    getCache(key: string): any;
    deleteCache(key: string): any;
    setCache(key: string, data: any, ttl: number): boolean;
  }
  