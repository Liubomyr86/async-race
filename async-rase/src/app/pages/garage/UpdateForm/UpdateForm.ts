import './_update.scss';

import BaseComponent from '../../../components/BaseComponent';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import { ICarData } from '../../../utils/alias';
import { api } from '../../../service/APIRequests';
import { state } from '../../../utils/State';

class UpdateForm extends BaseComponent {
  private _textInput: Input;
  private _colorInput: Input;
  private _updateButton: Button;

  constructor(renderCar: () => void) {
    super('form', ['form', 'update']);
    this._textInput = new Input(['update__text-input'], 'text');
    this._textInput.element.setAttribute('disabled', 'true');
    this._textInput.render(this.element);

    this._colorInput = new Input(['update__color-input'], 'color');
    this._colorInput.element.setAttribute('disabled', 'true');
    this._colorInput.render(this.element);

    this._updateButton = new Button(['btn', 'btn_update'], 'Update');
    this._updateButton.element.setAttribute('disabled', 'true');
    this._updateButton.render(this.element);
    this.updateCar(renderCar);
  }

  enableForm(data: ICarData) {
    this._textInput.element.removeAttribute('disabled');
    (<HTMLInputElement>this._textInput.element).value = data.name;
    this._colorInput.element.removeAttribute('disabled');
    (<HTMLInputElement>this._colorInput.element).value = data.color;
    this._updateButton.element.removeAttribute('disabled');
  }

  updateCar(render: () => void) {
    this._updateButton.element.addEventListener('click', async (event) => {
      event.preventDefault();
      const carData = {
        name: (<HTMLInputElement>this._textInput.element).value,
        color: (<HTMLInputElement>this._colorInput.element).value,
      };
      await api.updateCar(carData, state.selectCarId);
      (<HTMLInputElement>this._textInput.element).value = '';
      (<HTMLInputElement>this._colorInput.element).value = '#000000';
      this._textInput.element.setAttribute('disabled', 'true');
      this._colorInput.element.setAttribute('disabled', 'true');
      this._updateButton.element.setAttribute('disabled', 'true');
      render();
    });
  }
}

export default UpdateForm;
