import BaseComponent from '../BaseComponent';
import Button from '../Button/Button';

class Footer extends BaseComponent {
  private _prevButton: Button;
  private _nextButton: Button;

  constructor() {
    super('footer', ['footer']);
    this._prevButton = new Button(['btn', 'btn_prev'], 'Prev');
    this._prevButton.render(this.element);

    this._nextButton = new Button(['btn', 'btn_next'], 'Next');
    this._nextButton.render(this.element);
  }
}

export default Footer;
