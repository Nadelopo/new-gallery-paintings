import type { AxiosError } from 'axios';
import { api } from './APIInstance';

type Path = 'paintings' | 'authors' | 'locations';

type GetParams = {
  _limit?: number;
  _page?: number;
  q?: string;
  authorId?: number | null;
  locationId?: number | null;
  created_gte?: number | null;
  created_lte?: number | null;
};

export type DataError<T> =
  | { data: T; error: null; count: number | null }
  | { data: null; error: AxiosError; count: null };

export const getData = async <T>(path: Path, params?: GetParams): Promise<DataError<T>> => {
  try {
    const response = await api.get<T>(path, { params });
    const count = response.headers['x-total-count'];
    return { data: response.data, error: null, count: count ? Number(count) : null };
  } catch (error) {
    return { data: null, error: error as AxiosError, count: null };
  }
};
