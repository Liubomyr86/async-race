import BaseComponent from '../../../../components/BaseComponent';

class TableData extends BaseComponent {
  private _thNumber: BaseComponent;
  private _thCar: any;
  private _thName: BaseComponent;
  private _thWins: BaseComponent;
  private _thTime: BaseComponent;
  constructor() {
    super('tr');

    this._thNumber = new BaseComponent('th');
    this._thNumber.element.textContent = '№';
    this._thNumber.render(this.element);

    this._thCar = new BaseComponent('th');
    this._thCar.element.textContent = 'Car';
    this._thCar.render(this.element);

    this._thName = new BaseComponent('th');
    this._thName.element.textContent = 'Name';
    this._thName.render(this.element);

    this._thWins = new BaseComponent('th');
    this._thWins.element.textContent = 'Wins';
    this._thWins.render(this.element);

    this._thTime = new BaseComponent('th');
    this._thTime.element.textContent = 'Time';
    this._thTime.render(this.element);
  }
}

export default TableData;
