import './_car-track.scss';

import BaseComponent from '../../../components/BaseComponent';
import Button from '../../../components/Button/Button';
import Car from '../Car/Car';
import { api } from '../../../service/APIRequests';
import { ICarData, Path } from '../../../utils/alias';
import { state } from '../../../utils/State';
// import { glob } from '../../../utils/global';

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
  private _flag: BaseComponent;

  constructor(
    name: string,
    color: string,
    id: number,
    callback: (data: ICarData) => void,
    renderCar: () => void
  ) {
    super('div', ['car-container']);

    this._carSettings = new BaseComponent('div', ['car-container__settings']);
    this._carSettings.render(this.element);

    this._selectButton = new Button(
      ['btn', 'btn_select'],
      'Select',
      `select-${id}`
    );
    this._selectButton.render(this._carSettings.element);

    this._removeButton = new Button(
      ['btn', 'btn_remove'],
      'Remove',
      `remove-${id}`
    );
    this._removeButton.render(this._carSettings.element);

    this._carTitle = new BaseComponent('h2', ['car-container__title']);
    this._carTitle.element.textContent = name;
    this._carTitle.render(this._carSettings.element);

    this._carTrack = new BaseComponent('div', ['car-container__track']);
    this._carTrack.render(this.element);

    this._carControls = new BaseComponent('div', ['car-container__controls']);
    this._carControls.render(this._carTrack.element);

    this._startButton = new Button(['btn', 'btn_start'], 'A', `start${id}`);
    this._startButton.render(this._carControls.element);

    this._stopButton = new Button(['btn', 'btn_stop'], 'B', `stop-${id}`);
    this._stopButton.render(this._carControls.element);

    this._car = new Car(color, id);
    this._car.render(this._carControls.element);

    this._flag = new BaseComponent('span', ['car-container__flag']);
    this._flag.element.innerHTML = '&#127937';
    this._flag.render(this._carTrack.element);
    this.selectCar(id, callback);
    this.removeCar(id, renderCar);
    this.startCar(id);
    this.stopCar(id);
  }

  selectCar(id: number, callback: (data: ICarData) => void) {
    this._selectButton.element.addEventListener('click', async () => {
      const carData = await api.getCar(id);
      state.selectCarId = id;
      callback(carData);
    });
  }

  removeCar(id: number, render: () => void) {
    this._removeButton.element.addEventListener('click', async () => {
      await api.deleteCar(id);
      await api.deleteWinner(id);
      render();
    });
  }

  startCar(id: number) {
    const CAR_WIDTH = 140;
    this._startButton.element.addEventListener('click', async () => {
      const engineData = await api.startStopCarsEngine(id, 'started');
      const time = engineData.distance / engineData.velocity;
      const distance = Math.floor(
        this.getDistanceBetweenElements(this._car.element, this._flag.element) +
          CAR_WIDTH
      );
      state.animation[id] = this.animation(this._car.element, distance, time);

      const status = await api.drive(id, 'drive');

      if (!status.success) {
        console.log(state.animation);
        window.cancelAnimationFrame(state.animation[id].id!);
      }
    });
  }

  stopCar(id: number) {
    this._stopButton.element.addEventListener('click', async () => {
      await api.startStopCarsEngine(id, 'stopped');
      this._car.element.style.transform = 'translateX(0px)';

      if (state.animation[id])
        window.cancelAnimationFrame(state.animation[id].id!);
    });
  }

  getElementPosition(element: HTMLElement) {
    const { top, left, height, width } = element.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    return { x, y };
  }

  getDistanceBetweenElements(a: HTMLElement, b: HTMLElement) {
    const aPosition = this.getElementPosition(a);
    const bPosition = this.getElementPosition(b);

    const distance = Math.hypot(
      bPosition.x - aPosition.x,
      bPosition.y - aPosition.y
    );
    return distance;
  }

  animation(
    car: HTMLElement,
    distance: number,
    animationTime: number
  ): { id: number | null } {
    let start: number = 0;
    let myReq: { id: number | null } = { id: null };

    function step(timestamp: number) {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const passed = Math.round(time * (distance / animationTime));
      car.style.transform = `translateX(${Math.min(passed, distance)}px)`;
      if (passed < distance) {
        myReq.id = window.requestAnimationFrame(step);
      }
    }

    myReq.id = window.requestAnimationFrame(step);

    return myReq;
  }
}
export default CarTrack;
