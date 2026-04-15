
interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class CacheService {
  private cache = new Map<string, CacheItem<any>>();
  private readonly DEFAULT_EXPIRY = 60 * 60 * 1000; // 1 hora en milisegundos

  set<T>(key: string, data: T, expiry: number = this.DEFAULT_EXPIRY): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiry
    };
    this.cache.set(key, item);
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    const now = Date.now();
    if (now - item.timestamp > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;

    const now = Date.now();
    if (now - item.timestamp > item.expiry) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Limpiar cache expirado
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

export const cacheService = new CacheService();

// Limpiar cache expirado cada 10 minutos
setInterval(() => {
  cacheService.cleanup();
}, 10 * 60 * 1000);
