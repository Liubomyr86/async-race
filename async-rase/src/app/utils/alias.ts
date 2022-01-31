export enum Path {
  garage = '/garage',
  winners = '/winners',
}
export interface ICarData {
  name: string;
  color: string;
  id: number;
}

export interface IWinnersData {
  id: number;
  time: number;
  wins: number;
}

export interface IQueryParams {
  key?: string;
  value?: number;
}
