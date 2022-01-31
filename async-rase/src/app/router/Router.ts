import BaseComponent from '../components/BaseComponent';
import Garage from '../pages/garage/Garage';
import Winners from '../pages/winners/Winners';

const ROUTING: { name: string; component: () => BaseComponent }[] = [
  { name: '', component: () => new Garage() },

  {
    name: 'garage',
    component: () => new Garage(),
  },
  {
    name: 'winners',
    component: () => new Winners(),
  },
];

export class Router {
  private currentRouteName: string;

  public currentComponent: BaseComponent;

  private onRoute: () => void;

  constructor(onRoute: () => void) {
    this.currentRouteName = window.location.hash.slice(1);
    this.currentComponent = ROUTING.find(
      (page) => page.name === this.currentRouteName
    )!.component();
    this.onRoute = onRoute;
    this.initRoutes();
  }

  initRoutes(): void {
    window.onpopstate = () => {
      this.currentRouteName = window.location.hash.slice(1);
      // this.currentComponent.cleanUp();
      this.currentComponent = ROUTING.find(
        (page) => page.name === this.currentRouteName
      )!.component();
      this.onRoute();
    };
  }
}
