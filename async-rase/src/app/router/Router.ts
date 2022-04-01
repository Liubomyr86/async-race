import BaseComponent from '../components/BaseComponent';
import Garage from '../pages/garage/Garage';
import Winners from '../pages/winners/Winners';
import { state } from '../utils/State';

const ROUTING: {
  name: string;
  component: (arg: BaseComponent) => BaseComponent;
}[] = [
  {
    name: '',
    component: (elem) => elem,
  },
  {
    name: 'garage',
    component: (elem) => elem,
  },
  {
    name: 'winners',
    component: (elem) => elem,
  },
];

export class Router {
  private currentRouteName: string;

  public currentComponent: BaseComponent | undefined;

  private garage: Garage;
  private winners: Winners;

  private onRoute: () => void;

  constructor(onRoute: () => void) {
    this.winners = new Winners();

    this.garage = new Garage(this.winners.renderWinners.bind(this.winners));

    this.currentRouteName = window.location.hash.slice(1);
    const component =
      this.currentRouteName === 'winners' ? this.winners : this.garage;

    this.currentComponent = ROUTING.find(
      (page) => page.name === this.currentRouteName
    )?.component(component);
    this.onRoute = onRoute;
    this.initRoutes();
  }

  initRoutes(): void {
    window.onpopstate = () => {
      this.currentRouteName = window.location.hash.slice(1);
      state.view = this.currentRouteName;
      const component =
        this.currentRouteName === 'winners' ? this.winners : this.garage;

      this.currentComponent = ROUTING.find(
        (page) => page.name === this.currentRouteName
      )?.component(component);

      this.onRoute();
    };
  }
}
