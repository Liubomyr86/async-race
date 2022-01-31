import BaseComponent from './components/BaseComponent';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Garage from './pages/garage/Garage';
import { Router } from './router/Router';

class App {
  root: HTMLElement;
  header: Header;
  footer: Footer;
  main: BaseComponent;
  router: Router;

  constructor(rootElement: HTMLElement) {
    this.root = rootElement;

    this.header = new Header();

    this.main = new BaseComponent('main', ['main']);
    this.router = new Router(this.onRoute.bind(this));

    this.footer = new Footer();

    this.onRoute();
  }

  start() {
    this.root.append(this.header.element);
    this.root.append(this.main.element);
    this.root.append(this.footer.element);
  }

  onRoute() {
    this.main!.element.innerHTML = '';
    this.main!.element.appendChild(this.router.currentComponent.element);
  }
}

export default App;
