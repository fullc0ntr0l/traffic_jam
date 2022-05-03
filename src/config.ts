import { sample } from "lodash";

export class Config {
  // Road configuration
  static roadPadding = 12;
  static numberOfLanes = 4;
  static lanePadding = 4;
  static lanesSeparatorWidth = 2;
  static dashedLinesLength = 40;

  // Cars configuration
  static carLength = 64;
  static carWidth = 32;
  static carModels = [
    "29Special",
    "BeastGTS",
    "Bulldog",
    "Challenger",
    "Cossie",
    "Counthash",
    "F-19",
    "Flamer",
    "Hotrod",
    "Itali",
    "ItaliGTB",
    "ItaliGTO",
    "Jugular",
    "LeBonham",
    "Mamba",
    "Panther",
    "Penetrator",
    "Police",
    "Porka",
    "PorkaTurbo",
    "Roadster",
    "Speeder",
    "Stallion",
    "Stinger",
    "StingerZ29",
  ];

  // Driving configuration
  static minDistanceBetweenCars = 25;

  static get laneTotalWidth() {
    return this.lanePadding * 2 + this.carWidth;
  }

  static get roadTotalWidth() {
    return (
      this.laneTotalWidth * this.numberOfLanes +
      this.lanesSeparatorWidth * (this.numberOfLanes + 1) +
      this.roadPadding * 2
    );
  }

  static randomCarImage() {
    const carModel = sample(this.carModels) as string;

    return `images/cars/${carModel}.png`;
  }
}
