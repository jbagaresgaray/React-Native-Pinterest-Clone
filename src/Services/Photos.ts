import { ORDER_BY_TYPES, ORIENTATION_TYPES } from "../Constant";
import API from "./API";

export interface QueryParams {
  page?: number;
  per_page?: number;
  order_by?: "latest" | "oldest" | "popular" | ORDER_BY_TYPES;
}

export interface SearchQueryParams {
  query: string;
  page?: number;
  per_page?: number;
  order_by?: "relevant" | "latest";
  collections?: string;
  content_filter?: "low" | "high";
}

export interface CollectionPhotosParams {
  page?: number;
  per_page?: number;
  orientation?: ORIENTATION_TYPES;
}

export async function fetchPhotos(params?: QueryParams) {
  return API.get("/photos", {
    params,
  }).then((res) => res.data);
}

export async function fetchCollections(params?: QueryParams) {
  return API.get("/collections", {
    params,
  }).then((res) => res.data);
}

export async function fetchTopics(params?: QueryParams) {
  return API.get("/topics", {
    params,
  }).then((res) => res.data);
}

export async function searchPhotos(params?: SearchQueryParams) {
  return API.get("/search/photos", {
    params,
  }).then((res) => res.data);
}
