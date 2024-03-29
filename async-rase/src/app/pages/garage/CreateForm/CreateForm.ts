import './_greate.scss';

import BaseComponent from '../../../components/BaseComponent';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import { api } from '../../../service/APIRequests';

class CreateForm extends BaseComponent {
  private _textInput: Input;
  private _colorInput: Input;
  private _greateButton: Button;

  constructor(renderCar: () => void) {
    super('form', ['form', 'greate']);
    this._textInput = new Input(['greate__text-input'], 'text');
    this._textInput.render(this.element);

    this._colorInput = new Input(['greate__color-input'], 'color');
    this._colorInput.render(this.element);

    this._greateButton = new Button(['btn', 'btn_create'], 'Create');
    this._greateButton.render(this.element);
    this.createCar(renderCar);
  }

  createCar(render: () => void) {
    this._greateButton.element.addEventListener('click', async (event) => {
      event.preventDefault();
      const carData = {
        name: (<HTMLInputElement>this._textInput.element).value,
        color: (<HTMLInputElement>this._colorInput.element).value,
      };
      await api.createCar(carData);
      (<HTMLInputElement>this._textInput.element).value = '';
      (<HTMLInputElement>this._colorInput.element).value = '#000000';
      render();
    });
  }
}

export default CreateForm;
