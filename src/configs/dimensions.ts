import { Cars } from "./cars";

export class Dimensions {
  static roadPadding = 12;
  static numberOfLanes = 4;
  static lanePadding = 4;
  static lanesSeparatorWidth = 2;
  static dashedLinesLength = 40;

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
