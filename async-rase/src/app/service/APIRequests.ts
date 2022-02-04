import { ICarData, IQueryParams, IWinnersData, Path } from '../utils/alias';

class APIRequests {
  private _url: string = 'http://127.0.0.1:3000';

  generateQueryString = (queryParams: IQueryParams[] = []) =>
    queryParams.length
      ? `?${queryParams.map((item) => `${item.key}=${item.value}`).join('&')}`
      : ``;

  // Garage
  async getCars() {
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

  async getCar(id: number) {
    const response = await fetch(`${this._url}${Path.garage}/${id}`);
    const data: ICarData = await response.json();
    return data;
  }

  async createCar(carData: ICarData) {
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

  async updateCar(carData: ICarData, id: number) {
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

  async deleteCar(id: number) {
    await fetch(`${this._url}${Path.garage}/${id}`, {
      method: 'DELETE',
    });
  }

  // Winners
  async getWinners() {
    const response = await fetch(
      `${this._url}${Path.winners}${this.generateQueryString([
        { key: '_page', value: 1 },
        { key: '_limit', value: 10 },
      ])}`
    );
    const data: IWinnersData[] = await response.json();
    const count = Number(response.headers.get('X-Total-Count'));
    return { data, count };
  }

  async deleteWinner(id: number) {
    await fetch(`${this._url}${Path.winners}/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new APIRequests();
