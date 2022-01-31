import BaseComponent from '../../../components/BaseComponent';

class Table extends BaseComponent {
  private _tableHead: BaseComponent;
  private _headRow: BaseComponent;
  private _thNumber: BaseComponent;
  private _thCar: BaseComponent;
  private _thName: BaseComponent;
  private _thWins: any;
  private _thTime: BaseComponent;
  private _tableBody: BaseComponent;

  constructor() {
    super('table', ['winners__table']);
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

    this._thWins = new BaseComponent('th');
    this._thWins.element.textContent = 'Wins';
    this._thWins.render(this._headRow.element);

    this._thTime = new BaseComponent('th');
    this._thTime.element.textContent = 'Time';
    this._thTime.render(this._headRow.element);

    this._tableBody = new BaseComponent('tbody');
    this._tableBody.render(this.element);
  }
}

export default Table;
