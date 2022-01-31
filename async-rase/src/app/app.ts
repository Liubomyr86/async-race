import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Garage from './pages/garage/Garage';
import Winners from './pages/winners/Winners';
import { Router } from './router/Router';

class App {
  root: HTMLElement;
  header: Header;
  footer: Footer;
  main: HTMLElement;
  router: Router;

  // garage: Garage;
  // winners: Winners;

  constructor(rootElement: HTMLElement) {
    this.root = rootElement;

    this.header = new Header();

    this.main = new Garage().element;
    this.router = new Router(this.onRoute.bind(this));

    // this.winners = new Winners();

    this.footer = new Footer();

    this.onRoute();
  }

  start() {
    this.root.append(this.header.element);
    this.root.append(this.main);
    this.root.append(this.footer.element);
  }

  onRoute() {
    this.main!.innerHTML = '';
    this.main!.appendChild(this.router.currentComponent.element);
  }
}

export default App;
