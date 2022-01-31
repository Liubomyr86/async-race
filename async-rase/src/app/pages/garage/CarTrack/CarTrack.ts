import './_car-track.scss';

import BaseComponent from '../../../components/BaseComponent';
import Button from '../../../components/Button/Button';
import Car from '../Car/Car';

class CarTrack extends BaseComponent {
  private _carSettings: BaseComponent;
  private _selectButton: Button;
  private _removeButton: Button;
  private _carTitle: BaseComponent;
  private _carControls: BaseComponent;
  private _carTrack: BaseComponent;
  private _startButton: Button;
  private _stopButton: Button;
  private _car: Car;
  flag: BaseComponent;

  constructor(name: string, color: string, id: number) {
    super('div', ['car-container']);

    this._carSettings = new BaseComponent('div', ['car-container__settings']);
    this._carSettings.render(this.element);

    this._selectButton = new Button(['btn', 'btn_select'], 'Select');
    this._selectButton.render(this._carSettings.element);

    this._removeButton = new Button(['btn', 'btn_remove'], 'Remove');
    this._removeButton.render(this._carSettings.element);

    this._carTitle = new BaseComponent('h2', ['car-container__title']);
    this._carTitle.element.textContent = name;
    this._carTitle.render(this._carSettings.element);

    this._carTrack = new BaseComponent('div', ['car-container__track']);
    this._carTrack.render(this.element);

    this._carControls = new BaseComponent('div', ['car-container__controls']);
    this._carControls.render(this._carTrack.element);

    this._startButton = new Button(['btn', 'btn_start'], 'A');
    this._startButton.render(this._carControls.element);

    this._stopButton = new Button(['btn', 'btn_stop'], 'B');
    this._stopButton.render(this._carControls.element);

    this._car = new Car(color);
    this._car.render(this._carTrack.element);

    this.flag = new BaseComponent('span', ['car-container__flag']);
    this.flag.element.innerHTML = '&#127937';
    this.flag.render(this._carTrack.element);
  }
}
export default CarTrack;
