import './_winners.scss';

import BaseComponent from '../../components/BaseComponent';
import { api } from '../../service/APIRequests';
import Table from './Table/Table';
import TableData from './Table/TableData/TableData';
import { state } from '../../utils/State';
import Button from '../../components/Button/Button';

class Winners extends BaseComponent {
  private _countTitle: BaseComponent;
  private _countValue: BaseComponent;
  private _pageTitle: BaseComponent;
  private _pageValue: BaseComponent;
  private _scoreTable: Table | undefined;
  private _winner: Promise<TableData> | undefined;
  private _winners: Promise<TableData>[] | undefined;
  private _winnersView: BaseComponent;
  private _pageControls: BaseComponent;
  private _prevButton: Button;
  private _nextButton: Button;
  private _viewsControls: BaseComponent;
  private _garageButton: Button;
  private _garageLink: BaseComponent;
  private _winnersButton: Button;
  private _winnersLink: BaseComponent;

  constructor() {
    super('div', ['winners']);
    this._viewsControls = new BaseComponent('div', ['winners__views-controls']);
    this._viewsControls.render(this.element);

    this._garageButton = new Button(['btn', 'btn_garage'], '');
    this._garageLink = new BaseComponent('a');
    this._garageLink.element.textContent = 'Garage';
    this._garageLink.element.setAttribute('href', '#garage');
    this._garageLink.render(this._garageButton.element);
    this._garageButton.render(this._viewsControls.element);
    this._winnersButton = new Button(['btn', 'btn_winners'], '');
    this._winnersLink = new BaseComponent('a');
    this._winnersLink.element.setAttribute('href', '#winners');
    this._winnersLink.element.textContent = 'Winners';
    this._winnersLink.render(this._winnersButton.element);
    this._winnersButton.render(this._viewsControls.element);

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

    this._winnersView = new BaseComponent('div', ['winners__view']);
    this._winnersView.render(this.element);

    this._pageControls = new BaseComponent('div', ['winners__page-controls']);
    this._pageControls.render(this.element);

    this._prevButton = new Button(['btn', 'btn_prev'], 'Prev');
    this._prevButton.element.onclick = () => this.prevWinnersPage();
    this._prevButton.render(this._pageControls.element);

    this._nextButton = new Button(['btn', 'btn_next'], 'Next');
    this._nextButton.element.onclick = () => this.nextWinnersPage();
    this._nextButton.render(this._pageControls.element);

    this.renderWinners();
  }

  async renderWinners(): Promise<void> {
    const winnersData = await api.getWinners(state.winnersPageCount);
    this._countValue.element.textContent = `${winnersData.count}`;
    this._pageValue.element.textContent = `${state.winnersPageCount}`;
    this._winnersView.element.innerHTML = '';
    this._scoreTable = new Table();
    this._scoreTable.render(this._winnersView.element);

    state.totalWinners = winnersData.count;

    this._winners = winnersData.data.map(async (winner, index) => {
      const carData = await api.getCar(winner.id!);
      const positionNumber = index + 1;
      return new TableData(positionNumber, winner, carData);
    });

    this.enableDisableBtn();

    this._winners.forEach(async (winner) => {
      this._winner = winner;
      (await this._winner).render(this._scoreTable!.element);
    });
  }

  enableDisableBtn() {
    if (!state.totalWinners) return;
    if (state.winnersPageCount * 10 < state.totalWinners) {
      this._nextButton.element.removeAttribute('disabled');
    } else {
      this._nextButton.element.setAttribute('disabled', 'true');
    }
    if (state.winnersPageCount > 1) {
      this._prevButton.element.removeAttribute('disabled');
    } else {
      this._prevButton.element.setAttribute('disabled', 'true');
    }
  }

  nextWinnersPage() {
    state.winnersPageCount++;
    this.enableDisableBtn();
    this.renderWinners();
  }

  prevWinnersPage() {
    state.winnersPageCount--;
    this.enableDisableBtn();
    this.renderWinners();
  }
}
export default Winners;
