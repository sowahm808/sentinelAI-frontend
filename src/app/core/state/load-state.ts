export type LoadStatus='initial'|'loading'|'loaded'|'refreshing'|'empty'|'error'|'stale';
export interface LoadState<T>{status:LoadStatus;data:T;updatedAt?:string;error?:{message:string;correlationId?:string}}
