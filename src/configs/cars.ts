import { sample } from "lodash";

export interface ICarConfiguration {
  name: string;
  maxSpeed: number;
}

export class Cars {
  static carLength = 100;
  static carWidth = 50;
  static configurations: ICarConfiguration[] = [
    { name: "29Special", maxSpeed: 70 },
    { name: "BeastGTS", maxSpeed: 120 },
    { name: "Bulldog", maxSpeed: 100 },
    { name: "Challenger", maxSpeed: 90 },
    { name: "Cossie", maxSpeed: 85 },
    { name: "Counthash", maxSpeed: 80 },
    { name: "F-19", maxSpeed: 110 },
    { name: "Flamer", maxSpeed: 70 },
    { name: "Hotrod", maxSpeed: 75 },
    { name: "Itali", maxSpeed: 90 },
    { name: "ItaliGTB", maxSpeed: 95 },
    { name: "ItaliGTO", maxSpeed: 100 },
    { name: "Jugular", maxSpeed: 120 },
    { name: "LeBonham", maxSpeed: 95 },
    { name: "Mamba", maxSpeed: 110 },
    { name: "Panther", maxSpeed: 115 },
    { name: "Penetrator", maxSpeed: 100 },
    { name: "Police", maxSpeed: 150 },
    { name: "Porka", maxSpeed: 90 },
    { name: "PorkaTurbo", maxSpeed: 130 },
    { name: "Roadster", maxSpeed: 95 },
    { name: "Speeder", maxSpeed: 115 },
    { name: "Stallion", maxSpeed: 80 },
    { name: "Stinger", maxSpeed: 90 },
    { name: "StingerZ29", maxSpeed: 100 },
  ];

  static randomConfiguration() {
    return sample(this.configurations) as ICarConfiguration;
  }

  static imageForConfiguration(configuration: ICarConfiguration) {
    return `images/cars/${configuration.name}.png`;
  }
}
