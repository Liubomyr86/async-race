import './_winners.scss';

import BaseComponent from '../../components/BaseComponent';
import { api } from '../../service/APIRequests';
import { Path, IWinnersData } from '../../utils/alias';
import Table from './Table/Table';
import TableData from './Table/TableData/TableData';

class Winners extends BaseComponent {
  private _countTitle: BaseComponent;
  private _countValue: BaseComponent;
  private _pageTitle: BaseComponent;
  private _pageValue: BaseComponent;
  private _scoreTable: Table;
  private _winner: TableData | undefined;

  constructor() {
    super('div', ['winners']);

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
    this._pageValue.element.textContent = '1';
    this._pageValue.render(this._pageTitle.element);

    this._scoreTable = new Table();
    this._scoreTable.render(this.element);

    this.renderWinners();
  }

  async renderWinners() {
    const winnersData = await api.getWinners();
    this._countValue.element.textContent = `${winnersData.count}`;

    winnersData.data.forEach(async (winner, index) => {
      const carData = await api.getCar(winner.id!);
      const positionNumber = index + 1;
      this._winner = new TableData(positionNumber, winner, carData);
      this._winner.render(this._scoreTable.element);
    });
  }
}
export default Winners;
