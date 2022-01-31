import './_header.scss';

import BaseComponent from '../BaseComponent';
import Button from '../Button/Button';

class Header extends BaseComponent {
  private _garageButton: BaseComponent;
  private _winersButton: BaseComponent;

  constructor() {
    super('header', ['header', 'pattern']);

    this._garageButton = new BaseComponent('a', ['btn', 'btn_garage']);
    this._garageButton.element.textContent = 'Garage';
    this._garageButton.element.setAttribute('href', '#garage');
    this._garageButton.render(this.element);
    this._winersButton = new BaseComponent('a', ['btn', 'btn_winners']);
    this._winersButton.element.setAttribute('href', '#winners');
    this._winersButton.element.textContent = 'Winners';
    this._winersButton.render(this.element);
  }
}

export default Header;
