export enum Path {
  garage = '/garage',
  winners = '/winners',
  engine = '/engine',
}
export interface ICarData {
  name: string;
  color: string;
  id?: number;
}

export interface IWinnersData {
  id?: number;
  time: number;
  wins: number;
}

export interface IQueryParams {
  key?: string;
  value?: number | string;
}

export interface IEngineData {
  velocity: number;
  distance: number;
}

export interface IDriveStatus {
  success: boolean;
}
