import {
  ICarData,
  IDriveStatus,
  IEngineData,
  IQueryParams,
  IWinnersData,
  Path,
} from '../utils/alias';

class APIRequests {
  private _url: string = 'http://127.0.0.1:3000';

  generateQueryString = (queryParams: IQueryParams[] = []) =>
    queryParams.length
      ? `?${queryParams.map((item) => `${item.key}=${item.value}`).join('&')}`
      : ``;

  // Garage
  async getCars(): Promise<{ data: ICarData[]; count: number }> {
    const response = await fetch(
      `${this._url}${Path.garage}${this.generateQueryString([
        { key: '_page', value: 1 },
        { key: '_limit', value: 7 },
      ])}`
    );
    const data: ICarData[] = await response.json();
    const count = Number(response.headers.get('X-Total-Count'));
    return { data, count };
  }

  async getCar(id: number): Promise<ICarData> {
    const response = await fetch(`${this._url}${Path.garage}/${id}`);
    const data: ICarData = await response.json();
    return data;
  }

  async createCar(carData: ICarData): Promise<ICarData> {
    const response = await fetch(`${this._url}${Path.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });

    const data: ICarData = await response.json();
    return data;
  }

  async updateCar(carData: ICarData, id: number): Promise<ICarData> {
    const response = await fetch(`${this._url}${Path.garage}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });

    const data: ICarData = await response.json();
    return data;
  }

  async deleteCar(id: number): Promise<void> {
    await fetch(`${this._url}${Path.garage}/${id}`, {
      method: 'DELETE',
    });
  }

  // Engine
  async startStopCarsEngine(id: number, status: string): Promise<IEngineData> {
    const response = await fetch(
      `${this._url}${Path.engine}${this.generateQueryString([
        { key: 'id', value: id },
        { key: 'status', value: status },
      ])}`,
      {
        method: 'PATCH',
      }
    );
    const data: IEngineData = await response.json();
    return data;
  }

  async drive(id: number, status: string): Promise<{ success: boolean }> {
    const response = await fetch(
      `${this._url}${Path.engine}${this.generateQueryString([
        { key: 'id', value: id },
        { key: 'status', value: status },
      ])}`,
      {
        method: 'PATCH',
      }
    ).catch();

    return response.status !== 200 ? { success: false } : await response.json();
  }

  // Winners
  async getWinners(): Promise<{ data: IWinnersData[]; count: number }> {
    const response = await fetch(
      `${this._url}${Path.winners}${this.generateQueryString([
        { key: '_page', value: 1 },
        { key: '_limit', value: 10 },
      ])}`
    );
    const data: IWinnersData[] = await response.json();
    const count: number = Number(response.headers.get('X-Total-Count'));
    return { data, count };
  }

  async getWinner(id: number): Promise<IWinnersData> {
    const response = await fetch(`${this._url}${Path.winners}${id}`);
    const data: IWinnersData = await response.json();
    return data;
  }

  async createWinner(winnerData: IWinnersData): Promise<IWinnersData> {
    const response = await fetch(`${this._url}${Path.winners}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winnerData),
    });
    const data: IWinnersData = await response.json();
    return data;
  }

  async deleteWinner(id: number): Promise<void> {
    await fetch(`${this._url}${Path.winners}/${id}`, {
      method: 'DELETE',
    });
  }

  async updateWinner(winnerData: IWinnersData): Promise<IWinnersData> {
    const response = await fetch(`${this._url}${Path.winners}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winnerData),
    });

    const data: IWinnersData = await response.json();
    return data;
  }
}

export const api = new APIRequests();
