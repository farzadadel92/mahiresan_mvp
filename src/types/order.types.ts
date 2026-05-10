// types/index.ts
export type Empty = Record<string, never>;

export interface BaseResponse {
  success: boolean;
}