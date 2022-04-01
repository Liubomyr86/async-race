import './_table.scss';

import BaseComponent from '../../../components/BaseComponent';
import { state } from '../../../utils/State';

class Table extends BaseComponent {
  private _tableHead: BaseComponent;
  private _headRow: BaseComponent;
  private _thNumber: BaseComponent;
  private _thCar: BaseComponent;
  private _thName: BaseComponent;
  private _thWins: BaseComponent;
  private _thTime: BaseComponent;
  private renderWinners: () => Promise<void>;

  constructor(renderWinners: () => Promise<void>) {
    super('table', ['table', 'winners__table']);

    this.renderWinners = renderWinners;

    this._tableHead = new BaseComponent('thead');
    this._tableHead.render(this.element);
    this._headRow = new BaseComponent('tr');
    this._headRow.render(this._tableHead.element);
    this._thNumber = new BaseComponent('th');
    this._thNumber.element.textContent = '№';
    this._thNumber.render(this._headRow.element);

    this._thCar = new BaseComponent('th');
    this._thCar.element.textContent = 'Car';
    this._thCar.render(this._headRow.element);

    this._thName = new BaseComponent('th');
    this._thName.element.textContent = 'Name';
    this._thName.render(this._headRow.element);

    this._thWins = new BaseComponent('th', ['table__btn', 'table__btn_wins']);
    this._thWins.element.textContent = 'Wins';
    this._thWins.element.onclick = () => this.setSortByOrOrder('wins');
    this._thWins.render(this._headRow.element);

    this._thTime = new BaseComponent('th', ['table__btn', 'table__btn_time']);
    this._thTime.element.textContent = 'Time';
    this._thTime.element.onclick = () => this.setSortByOrOrder('time');
    this._thTime.render(this._headRow.element);
  }

  setSortByOrOrder(value: string) {
    state.sortBy = value;
    state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';

    switch (state.sortBy) {
      case 'wins':
        this._thWins.element.classList.remove('asc', 'desc');
        this._thWins.element.classList.add(`${state.sortOrder}`);
        this._thTime.element.classList.remove('asc', 'desc');
        break;

      case 'time':
        this._thTime.element.classList.remove('asc', 'desc');
        this._thTime.element.classList.add(`${state.sortOrder}`);
        this._thWins.element.classList.remove('asc', 'desc');

        break;
    }
    this.renderWinners();
  }
}

export default Table;
