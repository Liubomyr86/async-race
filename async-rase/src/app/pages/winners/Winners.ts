import BaseComponent from '../../components/BaseComponent';

class Winners extends BaseComponent {
  private _countTitle: BaseComponent;
  private _countValue: BaseComponent;
  private _pageTitle: BaseComponent;
  private _pageValue: BaseComponent;
  constructor() {
    super('main', ['main', 'winners']);

    this._countTitle = new BaseComponent('div', ['winners__cars-count']);
    this._countTitle.element.textContent = 'Winners: ';
    this._countTitle.render(this.element);
    this._countValue = new BaseComponent('span');
    this._countValue.element.textContent = '0';
    this._countValue.render(this._countTitle.element);

    this._pageTitle = new BaseComponent('div', ['winners__pages-count']);
    this._pageTitle.element.textContent = 'Page # ';
    this._pageTitle.render(this.element);
    this._pageValue = new BaseComponent('span');
    this._pageValue.element.textContent = '0';
    this._pageValue.render(this._pageTitle.element);
  }
}
export default Winners;
