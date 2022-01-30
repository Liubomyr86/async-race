import './_greate.scss';

import BaseComponent from '../../../components/BaseComponent';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';

class CreateForm extends BaseComponent {
  private _textInput: Input;
  private _colorInput: Input;
  private _greateButton: Button;

  constructor() {
    super('form', ['form', 'greate']);
    this._textInput = new Input(['greate__text-input'], 'text');
    this._textInput.render(this.element);

    this._colorInput = new Input(['greate__color-input'], 'color');
    this._colorInput.render(this.element);

    this._greateButton = new Button(['btn', 'btn_create'], 'Create');
    this._greateButton.render(this.element);
  }
}

export default CreateForm;
