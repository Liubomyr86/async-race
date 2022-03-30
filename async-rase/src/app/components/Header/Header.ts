import './_header.scss';

import BaseComponent from '../BaseComponent';
import Button from '../Button/Button';

class Header extends BaseComponent {
  private _garageButton: Button;
  private _winersButton: Button;
  private _winnersLink: BaseComponent;
  private _garageLink: BaseComponent;

  constructor() {
    super('header', ['header', 'pattern']);

    this._garageButton = new Button(['btn', 'btn_garage'], '');
    this._garageLink = new BaseComponent('a');
    this._garageLink.element.textContent = 'Garage';
    this._garageLink.element.setAttribute('href', '#garage');
    this._garageLink.render(this._garageButton.element);
    this._garageButton.render(this.element);
    this._winersButton = new Button(['btn', 'btn_winners'], '');
    this._winnersLink = new BaseComponent('a');
    this._winnersLink.element.setAttribute('href', '#winners');
    this._winnersLink.element.textContent = 'Winners';
    this._winnersLink.render(this._winersButton.element);
    this._winersButton.render(this.element);
  }

  disableBtn() {
    this._winersButton.element.setAttribute('disabled', 'true');
  }

  enableBtn() {
    this._winersButton.element.removeAttribute('disabled');
  }
}

export default Header;
