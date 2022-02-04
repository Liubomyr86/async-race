import './_update.scss';

import BaseComponent from '../../../components/BaseComponent';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';

class UpdateForm extends BaseComponent {
  private _textInput: Input;
  private _colorInput: Input;
  private _updateButton: Button;

  constructor() {
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
  }
}

export default UpdateForm;
