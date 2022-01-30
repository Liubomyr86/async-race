import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Garage from './pages/garage/Garage';
import Winners from './pages/winners/Winners';

class App {
  root: HTMLElement;
  header: Header;
  footer: Footer;
  garage: Garage;
  winners: Winners;

  constructor(rootElement: HTMLElement) {
    this.root = rootElement;

    this.header = new Header();

    this.garage = new Garage();

    this.winners = new Winners();

    this.footer = new Footer();
  }

  start() {
    this.root.append(this.header.element);
    this.root.append(this.winners.element);
    this.root.append(this.footer.element);
  }
}

export default App;
