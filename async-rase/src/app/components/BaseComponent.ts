class BaseComponent {
  element: HTMLElement;

  constructor(tagName: string, className?: string[]) {
    this.element = document.createElement(tagName);
    if (className) this.element.classList.add(...className);
  }

  render(elem: HTMLElement): HTMLElement {
    return elem.appendChild(this.element);
  }

  remove(elem: HTMLElement): HTMLElement {
    return elem.removeChild(this.element);
  }
}
export default BaseComponent;
