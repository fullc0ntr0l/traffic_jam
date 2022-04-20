import { Cars } from "./cars";

export class Dimensions {
  static roadPadding = 25;
  static numberOfLanes = 4;
  static lanePadding = 5;
  static lanesSeparatorWidth = 5;
  static dashedLinesLength = 80;

  static get laneTotalWidth() {
    return this.lanePadding * 2 + Cars.carWidth;
  }

  static get roadTotalWidth() {
    return (
      this.laneTotalWidth * this.numberOfLanes +
      this.lanesSeparatorWidth * (this.numberOfLanes + 1) +
      this.roadPadding * 2
    );
  }
}
