import './_garage.scss';

import BaseComponent from '../../components/BaseComponent';
import Button from '../../components/Button/Button';
import { api } from '../../service/APIRequests';
import { ICarData, Path } from '../../utils/alias';
import CarTrack from './CarTrack/CarTrack';
import CreateForm from './CreateForm/CreateForm';
import UpdateForm from './UpdateForm/UpdateForm';

class Garage extends BaseComponent {
  private _greateForm: CreateForm;
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

  constructor() {
    super('main', ['main', 'garage']);

    this._formsContainer = new BaseComponent('div', ['garage__forms']);
    this._formsContainer.render(this.element);
    this._greateForm = new CreateForm();
    this._greateForm.render(this._formsContainer.element);
    this._updateForm = new UpdateForm();
    this._updateForm.render(this._formsContainer.element);

    this._raceControls = new BaseComponent('div', ['garage__controls']);
    this._raceControls.render(this.element);
    this._raceButton = new Button(['btn', 'btn_race'], 'Race');
    this._raceButton.render(this._raceControls.element);
    this._resetButton = new Button(['btn', 'btn_reset'], 'Reset');
    this._resetButton.render(this._raceControls.element);
    this._generateButton = new Button(['btn', 'btn_generate'], 'Generate cars');
    this._generateButton.render(this._raceControls.element);

    this._garageView = new BaseComponent('div', ['garage__view']);
    this._garageView.render(this.element);
    this._countTitle = new BaseComponent('div', ['garage__cars-count']);
    this._countTitle.element.textContent = 'Garage: ';
    this._countTitle.render(this._garageView.element);
    this._countValue = new BaseComponent('span');
    this._countValue.element.textContent = '0';
    this._countValue.render(this._countTitle.element);

    this._pageTitle = new BaseComponent('div', ['garage__pages-count']);
    this._pageTitle.element.textContent = 'Page # ';
    this._pageTitle.render(this._garageView.element);
    this._pageValue = new BaseComponent('span');
    this._pageValue.element.textContent = '0';
    this._pageValue.render(this._pageTitle.element);

    this.renderCars();
  }

  async renderCars() {
    const carsData = await api.getCars(Path.garage);

    carsData.data.forEach((car) => {
      this._car = new CarTrack(car.name, car.color, car.id);
      this._car.render(this._garageView.element);
    });
  }
}

export default Garage;
