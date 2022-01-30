class APIRequests {
  private _url: string = 'http://127.0.0.1:3000';

  async getCars(path: string) {
    const response = await fetch(`${this._url}${path}`);
    const data = await response.json();
    console.log(data);
  }
}

export const api = new APIRequests();
