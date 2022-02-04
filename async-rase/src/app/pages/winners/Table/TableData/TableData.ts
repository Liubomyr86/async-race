import './_table-data.scss';

import BaseComponent from '../../../../components/BaseComponent';
import { ICarData, IWinnersData } from '../../../../utils/alias';
import Car from '../../../garage/Car/Car';

class TableData extends BaseComponent {
  private _thNumber: BaseComponent;
  private _thCar: any;
  private _thName: BaseComponent;
  private _thWins: BaseComponent;
  private _thTime: BaseComponent;
  private _car: Car;
  constructor(position: number, winner: IWinnersData, car: ICarData) {
    super('tr');

    this._thNumber = new BaseComponent('th');
    this._thNumber.element.textContent = `${position}`;
    this._thNumber.render(this.element);

    this._thCar = new BaseComponent('th');
    this._car = new Car(car.color, car.id!);
    this._car.render(this._thCar.element);
    this._thCar.render(this.element);

    this._thName = new BaseComponent('th');
    this._thName.element.textContent = `${car.name}`;
    this._thName.render(this.element);

    this._thWins = new BaseComponent('th');
    this._thWins.element.textContent = `${winner.wins}`;
    this._thWins.render(this.element);

    this._thTime = new BaseComponent('th');
    this._thTime.element.textContent = `${winner.time}`;
    this._thTime.render(this.element);
  }
}

export default TableData;
