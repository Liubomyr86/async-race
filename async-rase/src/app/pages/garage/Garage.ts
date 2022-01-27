import BaseComponent from '../../components/BaseComponent';
import Button from '../../components/Button/Button';
import GreateForm from './GreateForm/GreateForm';
import UpdateForm from './UpdateForm/UpdateForm';

class Garage extends BaseComponent {
  private _greateForm: GreateForm;
  private _updateForm: UpdateForm;
  private _raceButton: Button;
  private _resetButton: Button;
  private _generateButton: Button;

  constructor() {
    super('div', ['garage']);
    this._greateForm = new GreateForm();
    this._greateForm.render(this.element);

    this._updateForm = new UpdateForm();
    this._updateForm.render(this.element);

    this._raceButton = new Button(['btn', 'btn_race'], 'Race');
    this._raceButton.render(this.element);

    this._resetButton = new Button(['btn', 'btn_reset'], 'Reset');
    this._resetButton.render(this.element);

    this._generateButton = new Button(['btn', 'btn_generate'], 'Generate cars');
    this._generateButton.render(this.element);
  }
}

export default Garage;
