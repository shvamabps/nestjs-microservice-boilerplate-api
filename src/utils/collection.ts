import { ApiBadRequestException } from './exception';

export class CollectionUtil {
  static groupBy = <T>(collection: unknown[] = [], key: string): { [key: string]: T[] } => {
    if (!key.length) {
      throw new ApiBadRequestException();
    }

    return collection.reduce((prev, next) => {
      prev[next[key]] = prev[next[key]] ?? [];
      prev[next[key]].push(next);
      return prev;
    }, {}) as { [key: string]: [] };
  };

  static group = (collection: unknown[]) => {
    return collection.reduce(function (rv, x: string | number) {
      (rv[x] = rv[x] || []).push(x);
      return rv;
    }, {});
  };

  static maxBy = (collection: unknown[] = [], key: string) => {
    if (!key.length) {
      throw new ApiBadRequestException('key is required');
    }

    return collection.reduce((prev, current) => {
      return Number(prev[key] > current[key]) ? prev : current;
    });
  };

  static max = (collection: string[] | number[]) => {
    return Math.max(...collection.map((c: number | string) => Number(c)));
  };

  static minBy = (collection: unknown[] = [], key: string) => {
    if (!key.length) {
      throw new ApiBadRequestException('key is required');
    }

    return collection.reduce((prev, current) => {
      return Number(prev[key] > current[key]) ? current : prev;
    });
  };

  static min = (collection: string[] | number[]) => {
    return Math.min(...collection.map((c: number | string) => Number(c)));
  };

  static sum = (collection: unknown[] = []) => {
    return collection.reduce((prev, current): number => {
      return Number(prev) + Number(current);
    });
  };

  static sumBy = (collection: unknown[] = [], key: string) => {
    if (!key.length) {
      throw new ApiBadRequestException('key is required');
    }

    return collection.reduce((prev, current): number => {
      if (isNaN(prev[key] || 0)) {
        return 0 + Number(current[key]);
      }

      if (prev[key]) {
        return Number(prev[key]) + Number(current[key]);
      }

      return Number(prev) + Number(current[key]);
    });
  };

  static hasDuplicated = (collection: unknown[] = []) => {
    return new Set(collection).size !== collection.length;
  };

  static chunk(list: unknown[], size: number) {
    const array = [];
    for (let i = 0; i < list.length; i += size) {
      const chunk = list.slice(i, i + size);
      array.push(chunk);
    }

    return array;
  }
}

export type LastType = {
  key: string;
  length: number | null;
};
