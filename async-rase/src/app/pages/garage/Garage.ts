import BaseComponent from '../../components/BaseComponent';
import Button from '../../components/Button/Button';
import { api } from '../../service/APIRequests/APIRequests';
import { Path } from '../../utils/alias';
import CarTrack from './CarTrack/CarTrack';
import CreateForm from './CreateForm/CreateForm';
import UpdateForm from './UpdateForm/UpdateForm';

class Garage extends BaseComponent {
  private _greateForm: CreateForm;
  private _updateForm: UpdateForm;
  private _raceButton: Button;
  private _resetButton: Button;
  private _generateButton: Button;
  private _garage: Promise<void>;
  private _garageCount: BaseComponent;
  private _pageCount: BaseComponent;
  private _garageView: BaseComponent;
  cars: CarTrack;

  constructor() {
    super('div', ['garage']);
    this._garage = api.getCars(Path.garage);

    this._greateForm = new CreateForm();
    this._greateForm.render(this.element);

    this._updateForm = new UpdateForm();
    this._updateForm.render(this.element);

    this._raceButton = new Button(['btn', 'btn_race'], 'Race');
    this._raceButton.render(this.element);

    this._resetButton = new Button(['btn', 'btn_reset'], 'Reset');
    this._resetButton.render(this.element);

    this._generateButton = new Button(['btn', 'btn_generate'], 'Generate cars');
    this._generateButton.render(this.element);

    this._garageView = new BaseComponent('div', ['garage__viev']);
    this._garageView.render(this.element);

    this._garageCount = new BaseComponent('span', ['garage__cars-count']);
    this._garageCount.element.textContent = '0';
    this._garageCount.render(this._garageView.element);

    this._pageCount = new BaseComponent('span', ['garage__pages-count']);
    this._pageCount.element.textContent = '0';
    this._pageCount.render(this._garageView.element);

    this.cars = new CarTrack();
    this.cars.render(this._garageView.element);

    this.getCars();
  }

  getCars() {
    let data: any = [];
    this._garage.then((res) => (data = res));
    console.log(data);
  }
}

export default Garage;
