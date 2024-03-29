import './_garage.scss';

import BaseComponent from '../../components/BaseComponent';
import Button from '../../components/Button/Button';
import { api } from '../../service/APIRequests';
import { IWinner } from '../../utils/alias';
import CarTrack from './CarTrack/CarTrack';
import CreateForm from './CreateForm/CreateForm';
import UpdateForm from './UpdateForm/UpdateForm';
import { state } from '../../utils/State';

class Garage extends BaseComponent {
  private _createForm: CreateForm;
  private _updateForm: UpdateForm;
  private _raceButton: Button;
  private _resetButton: Button;
  private _generateButton: Button;
  private _countTitle: BaseComponent;
  private _pageTitle: BaseComponent;
  private _garageView: BaseComponent;
  private _formsContainer: BaseComponent;
  private _raceControls: BaseComponent;
  private _countValue: BaseComponent;
  private _pageValue: BaseComponent;
  private _car: CarTrack | undefined;
  private _garage: CarTrack[] | undefined;
  private _message: BaseComponent;
  private _prevButton: Button;
  private _nextButton: Button;
  private _pageControls: BaseComponent;
  private _garageButton: Button;
  private _garageLink: BaseComponent;
  private _winnersButton: Button;
  private _winnersLink: BaseComponent;
  private _viewsControls: BaseComponent;

  constructor(renderWinnersView: () => Promise<void>) {
    super('div', ['garage']);

    this._viewsControls = new BaseComponent('div', ['garage__views-controls']);
    this._viewsControls.render(this.element);

    this._garageButton = new Button(['btn', 'btn_garage'], '');
    this._garageLink = new BaseComponent('a');
    this._garageLink.element.textContent = 'Garage';
    this._garageLink.element.setAttribute('href', '#garage');
    this._garageLink.render(this._garageButton.element);
    this._garageButton.render(this._viewsControls.element);
    this._winnersButton = new Button(['btn', 'btn_winners'], '');
    this._winnersButton.element.onclick = () => {
      state.view = 'winners';
      renderWinnersView();
    };
    this._winnersLink = new BaseComponent('a');
    this._winnersLink.element.setAttribute('href', '#winners');
    this._winnersLink.element.textContent = 'Winners';
    this._winnersLink.render(this._winnersButton.element);
    this._winnersButton.render(this._viewsControls.element);

    this._formsContainer = new BaseComponent('div', ['garage__forms']);
    this._formsContainer.render(this.element);
    this._createForm = new CreateForm(this.renderCars.bind(this));
    this._createForm.render(this._formsContainer.element);
    this._updateForm = new UpdateForm(this.renderCars.bind(this));
    this._updateForm.render(this._formsContainer.element);

    this._raceControls = new BaseComponent('div', ['garage__controls']);
    this._raceControls.render(this.element);
    this._raceButton = new Button(['btn', 'btn_race'], 'Race');
    this._raceButton.element.onclick = () => this.raceAllCars();
    this._raceButton.render(this._raceControls.element);
    this._resetButton = new Button(['btn', 'btn_reset'], 'Reset');
    this._resetButton.element.onclick = () => this.resetAllCars();
    this._resetButton.element.setAttribute('disabled', 'true');
    this._resetButton.render(this._raceControls.element);
    this._generateButton = new Button(['btn', 'btn_generate'], 'Generate cars');
    this._generateButton.element.onclick = () => this.generateCars();
    this._generateButton.render(this._raceControls.element);

    this._garageView = new BaseComponent('div', ['garage__view']);
    this._garageView.render(this.element);
    this._countTitle = new BaseComponent('div', ['garage__cars-count']);
    this._countTitle.element.textContent = 'Garage: ';
    this._countTitle.render(this._garageView.element);
    this._countValue = new BaseComponent('span');
    this._countValue.render(this._countTitle.element);

    this._pageTitle = new BaseComponent('div', ['garage__pages-count']);
    this._pageTitle.element.textContent = 'Page # ';
    this._pageTitle.render(this._garageView.element);
    this._pageValue = new BaseComponent('span');
    this._pageValue.render(this._pageTitle.element);

    this._pageControls = new BaseComponent('div', ['garage__page-controls']);
    this._pageControls.render(this.element);

    this._prevButton = new Button(['btn', 'btn_prev'], 'Prev');
    this._prevButton.element.onclick = () => this.prevGaragePage();
    this._prevButton.render(this._pageControls.element);

    this._nextButton = new Button(['btn', 'btn_next'], 'Next');
    this._nextButton.element.onclick = () => this.nextGaragePage();
    this._nextButton.render(this._pageControls.element);

    this._message = new BaseComponent('p', ['garage__message']);

    this.renderCars();
  }

  async renderCars(): Promise<void> {
    const carsData = await api.getCars(state.garagePageCount);
    this._countValue.element.textContent = `${carsData.count}`;
    this._pageValue.element.textContent = `${state.garagePageCount}`;

    this._garageView.element.innerHTML = '';
    this._countTitle.render(this._garageView.element);
    this._pageTitle.render(this._garageView.element);
    state.totalCars = carsData.count;

    this._garage = carsData.data.map(
      (car) =>
        new CarTrack(
          car.name,
          car.color,
          car.id!,
          this._updateForm.enableForm.bind(this._updateForm),
          this.renderCars.bind(this)
        )
    );

    state.garagePageCars = this._garage.length;
    this.enableDisableBtn();

    this._garage.forEach((car) => {
      this._car = car;
      this._car.render(this._garageView.element);
    });
  }

  async raceAllCars() {
    this._raceButton.element.setAttribute('disabled', 'true');

    const requests: Promise<IWinner>[] | undefined = this._garage?.map(
      async (car) => await car.startCar(car.getCarId())
    );

    const carIds = this._garage?.map((car) => car.getCarId());
    const winner = await this.getWinner(requests, carIds!);
    this._message.element.textContent = `${winner.car?.name} went first ${winner.time}s !`;
    this._message.render(this._garageView.element);
    this.saveWinners(winner.id, winner.time);
  }

  resetAllCars(): void {
    this._resetButton.element.setAttribute('disabled', 'true');
    this._raceButton.element.removeAttribute('disabled');

    this._message.remove(this._garageView.element);

    this._garage?.forEach((car) => car.stopCar(car.getCarId()));
  }

  async getWinner(
    promises: Promise<IWinner>[] | undefined,
    ids: number[]
  ): Promise<{
    car: { name: string; color: string } | undefined;
    id: number;
    time: number;
  }> {
    const { success, id, time } = await Promise.race(promises!);

    if (!success) {
      const failedIndex = ids!.findIndex((i: number) => i === id);
      const restPromises = [
        ...promises!.slice(0, failedIndex),
        ...promises!.slice(failedIndex + 1, promises!.length),
      ];
      const restIds = [
        ...ids.slice(0, failedIndex),
        ...ids.slice(failedIndex + 1, ids.length),
      ];
      return this.getWinner(restPromises, restIds);
    }
    const car = this._garage?.find((car) => car.getCarData(id));
    this._resetButton.element.removeAttribute('disabled');
    return {
      car: car?.getCarData(id),
      id: id,
      time: +(time / 1000).toFixed(2),
    };
  }
  async saveWinners(id: number, time: number) {
    const winnerStatus = await api.getWinnerStatus(id);

    if (winnerStatus === 404) {
      await api.createWinner({ id, time, wins: 1 });
    } else {
      const winner = await api.getWinner(id);
      await api.updateWinner({
        id,
        wins: winner.wins + 1,
        time: time < winner.time ? time : winner.time,
      });
    }
  }

  generateCars() {
    const models = [
      'Tesla',
      'Mersedes',
      'BWM',
      'Toyota',
      'Zhiguli',
      'Moskvich',
      'Opel',
      'Aston Martin',
      'Porshe',
    ];

    const names = [
      'Model S',
      'CLK',
      '7',
      'Camry',
      '9',
      'Corsa',
      'DB9',
      'Cayene',
    ];

    const getRandomName = () => {
      const model = models[Math.floor(Math.random() * models.length)];
      const name = names[Math.floor(Math.random() * names.length)];
      return `${model} ${name}`;
    };

    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const generateRandomCars = (
      count = 100
    ): Array<{ name: string; color: string }> =>
      new Array(count)
        .fill('car')
        .map(() => ({ name: getRandomName(), color: getRandomColor() }));
    const carsArr = generateRandomCars();

    carsArr.forEach((car) => api.createCar(car));
    this.renderCars();
  }

  enableDisableBtn() {
    if (!state.totalCars) return;
    if (state.garagePageCount * 7 < state.totalCars) {
      this._nextButton.element.removeAttribute('disabled');
    } else {
      this._nextButton.element.setAttribute('disabled', 'true');
    }
    if (state.garagePageCount > 1) {
      this._prevButton.element.removeAttribute('disabled');
    } else {
      this._prevButton.element.setAttribute('disabled', 'true');
    }
  }
  nextGaragePage() {
    state.garagePageCount++;
    this.enableDisableBtn();
    this.renderCars();
    this.resetAllCars();
  }

  prevGaragePage() {
    state.garagePageCount--;
    this.enableDisableBtn();
    this.renderCars();
    this.resetAllCars();
  }
}

export default Garage;
