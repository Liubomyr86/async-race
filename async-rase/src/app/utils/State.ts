class State {
  public garageCount = 0;
  public garagePageCount = 1;

  public selectCarId: number = 0;
  public animation: { [index: number]: { id: number | null } } = {};
}

export const state = new State();
