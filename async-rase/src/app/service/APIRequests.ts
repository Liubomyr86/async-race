import { ICarData, IWinnersData } from '../utils/alias';

class APIRequests {
  private _url: string = 'http://127.0.0.1:3000';

  async getCars(path: string) {
    const response = await fetch(`${this._url}${path}`);
    const data: ICarData[] = await response.json();
    console.log(data);

    const count = Number(response.headers.get('X-Total-Count'));
    return { data, count };
  }

  async getWinners(path: string) {
    const response = await fetch(`${this._url}${path}`);
    const data: IWinnersData = await response.json();
    console.log(data);

    const count = Number(response.headers.get('X-Total-Count'));
    return { data, count };
  }
}

export const api = new APIRequests();
