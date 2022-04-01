class State {
  // public garageCount: number = 0;
  public garagePageCount: number = 1;
  public winnersPageCount: number = 1;
  public view: string = window.location.hash.slice(1);

  public garagePageCars: number = 0;
  public winnersPageCars: number = 0;

  public totalWinners: number = 0;
  public totalCars: number = 0;
  public selectCarId: number = 0;
  public animation: { [index: number]: { id: number | null } } = {};
}

export const state = new State();
