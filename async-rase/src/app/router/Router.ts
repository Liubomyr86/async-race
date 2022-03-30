import BaseComponent from '../components/BaseComponent';
import Garage from '../pages/garage/Garage';
import Winners from '../pages/winners/Winners';

const ROUTING: {
  name: string;
  component: (d: () => void, e: () => void) => BaseComponent;
}[] = [
  {
    name: '',
    component: (disable: () => void, enable: () => void) =>
      new Garage(disable, enable),
  },
  {
    name: 'garage',
    component: (disable: () => void, enable: () => void) =>
      new Garage(disable, enable),
  },
  {
    name: 'winners',
    component: (disable: () => void, enable: () => void) =>
      new Winners(disable, enable),
  },
];

export class Router {
  private currentRouteName: string;

  public currentComponent: BaseComponent;

  private onRoute: () => void;
  public disable: () => void;
  public enable: () => void;

  constructor(onRoute: () => void, disable: () => void, enable: () => void) {
    this.currentRouteName = window.location.hash.slice(1);
    this.currentComponent = ROUTING.find(
      (page) => page.name === this.currentRouteName
    )!.component(disable, enable);
    this.onRoute = onRoute;
    this.initRoutes();
    this.disable = disable;
    this.enable = enable;
  }

  initRoutes(): void {
    window.onpopstate = () => {
      this.currentRouteName = window.location.hash.slice(1);
      this.currentComponent = ROUTING.find(
        (page) => page.name === this.currentRouteName
      )!.component(this.disable.bind(this), this.enable.bind(this));

      this.onRoute();
    };
  }
}
