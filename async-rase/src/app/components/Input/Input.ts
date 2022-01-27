import BaseComponent from '../BaseComponent';

class Input extends BaseComponent {
  constructor(className: string[], type: string, id?: string) {
    super('input', className);
    this.element.setAttribute('type', type);
    if (id) this.element.setAttribute('id', id);
  }
}

export default Input;
