import BaseComponent from '../BaseComponent';

class Button extends BaseComponent {
  constructor(className: string[], text: string, id?: string, type?: string) {
    super('button', className);
    this.element.textContent = text;
    if (id) this.element.setAttribute('id', id);
    if (type) this.element.setAttribute('type', type);
  }
}

export default Button;
