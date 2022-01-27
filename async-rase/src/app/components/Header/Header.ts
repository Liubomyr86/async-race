import BaseComponent from '../BaseComponent';
import Button from '../Button/Button';

class Header extends BaseComponent {
  private _garageButton: Button;
  private _winersButton: Button;

  constructor() {
    super('header', ['header']);

    this._garageButton = new Button(['btn', 'btn_garage'], 'Garage');
    this._garageButton.render(this.element);
    this._winersButton = new Button(['btn', 'btn_winers'], 'Winers');
    this._winersButton.render(this.element);
  }
}

export default Header;
