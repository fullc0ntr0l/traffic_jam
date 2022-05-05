import * as PIXI from "pixi.js";
import { Config } from "../config";

export class Car {
  public sprite: PIXI.Sprite;
  public maxSpeed: number;
  public speed: number;
  public laneNumber: number;
  public frontCar?: Car;
  public followingCar?: Car;

  constructor(laneNumber: number, carImage = Config.randomCarImage()) {
    this.sprite = this.createSprite(carImage);
    this.maxSpeed = Config.randomMaxSpeed();
    this.speed = this.maxSpeed;
    this.laneNumber = laneNumber;
    this.changeLane(laneNumber);
  }

  public drive = () => {
    this.sprite.x += this.speed;
  };

  public changeLane = (laneNumber: number) => {
    this.laneNumber = laneNumber;
    this.sprite.y = this.calculateY(laneNumber);
  };

  public isCloseToFrontCar = (): boolean => {
    if (!this.frontCar) {
      return false;
    }

    if (this.laneNumber !== this.frontCar.laneNumber) {
      return false;
    }

    return (
      this.sprite.position.x + Config.minDistanceBetweenCars >=
      this.frontCar.sprite.position.x - Config.carLength
    );
  };

  private createSprite = (carImage: string) => {
    const sprite = PIXI.Sprite.from(carImage);
    sprite.anchor.set(0, 0.5);
    sprite.angle = 180;
    sprite.x = 0;
    sprite.y = 0;
    sprite.width = Config.carLength;
    sprite.height = Config.carWidth;
    sprite.interactive = true;

    return sprite;
  };

  private calculateY = (laneNumber: number): number => {
    return (
      Config.roadPadding +
      Config.lanesSeparatorWidth +
      Config.laneTotalWidth / 2 +
      (laneNumber - 1) * (Config.laneTotalWidth + Config.lanesSeparatorWidth)
    );
  };
}
