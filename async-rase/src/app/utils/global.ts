// class Globall {
//   getElementPosition(element: HTMLElement) {
//     const { top, left, height, width } = element.getBoundingClientRect();
//     const x = left + width / 2;
//     const y = top + height / 2;
//     return { x, y };
//   }

//   getDistanceBetweenElements(a: HTMLElement, b: HTMLElement) {
//     const aPosition = this.getElementPosition(a);
//     const bPosition = this.getElementPosition(b);

//     const distance = Math.hypot(
//       bPosition.x - aPosition.x,
//       bPosition.y - aPosition.y
//     );
//     return distance;
//   }

//   animation(car: HTMLElement, distance: number, animationTime: number): number {
//     let start: number = 0;
//     let myReq: number | null = null;

//     function step(timestamp: number) {
//       if (!start) start = timestamp;
//       const time = timestamp - start;
//       const passed = Math.round(time * (distance / animationTime));
//       car.style.transform = `translateX(${Math.min(passed, distance)}px)`;
//       if (passed < distance) {
//         myReq = window.requestAnimationFrame(step);
//         console.log(myReq);
//       }
//     }

//     myReq = window.requestAnimationFrame(step);
//     console.log(myReq);

//     return myReq;
//   }
// }

// export const glob = new Globall();
