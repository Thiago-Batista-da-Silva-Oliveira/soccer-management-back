import NodeCache from 'node-cache';
import { injectable } from 'tsyringe';
import { CACHE_TTL } from '../../../../../config/constants';
import { ICacheProvider } from '../models/ICacheProvider';

@injectable()
export class CacheProvider implements ICacheProvider {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({ checkperiod: CACHE_TTL.CHECK_PERIOD });
  }
  public getCache(key: string): any {
    return this.cache.get(key);
  }
  public setCache(key: string, data: any, ttl: number): boolean {
    return this.cache.set(key, data, ttl);
  }

  public deleteCache(key: string) {
    return this.cache.del(key);
  }
}
