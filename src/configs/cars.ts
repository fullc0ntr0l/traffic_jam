import { sample } from "lodash";

export interface ICarConfiguration {
  name: string;
  maxSpeed: number;
}

export class Cars {
  static carLength = 64;
  static carWidth = 32;
  static configurations: ICarConfiguration[] = [
    { name: "29Special", maxSpeed: 2.3 },
    { name: "BeastGTS", maxSpeed: 4 },
    { name: "Bulldog", maxSpeed: 3.5 },
    { name: "Challenger", maxSpeed: 3 },
    { name: "Cossie", maxSpeed: 2.8 },
    { name: "Counthash", maxSpeed: 2.75 },
    { name: "F-19", maxSpeed: 3.3 },
    { name: "Flamer", maxSpeed: 2.3 },
    { name: "Hotrod", maxSpeed: 2.5 },
    { name: "Itali", maxSpeed: 3 },
    { name: "ItaliGTB", maxSpeed: 3.1 },
    { name: "ItaliGTO", maxSpeed: 3.3 },
    { name: "Jugular", maxSpeed: 4 },
    { name: "LeBonham", maxSpeed: 3.1 },
    { name: "Mamba", maxSpeed: 3.3 },
    { name: "Panther", maxSpeed: 3.5 },
    { name: "Penetrator", maxSpeed: 3.3 },
    { name: "Police", maxSpeed: 5 },
    { name: "Porka", maxSpeed: 3 },
    { name: "PorkaTurbo", maxSpeed: 4.3 },
    { name: "Roadster", maxSpeed: 3.1 },
    { name: "Speeder", maxSpeed: 3.5 },
    { name: "Stallion", maxSpeed: 2.7 },
    { name: "Stinger", maxSpeed: 3 },
    { name: "StingerZ29", maxSpeed: 3.3 },
  ];

  static randomConfiguration() {
    return sample(this.configurations) as ICarConfiguration;
  }

  static imageForConfiguration(configuration: ICarConfiguration) {
    return `images/cars/${configuration.name}.png`;
  }
}
