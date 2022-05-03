import * as PIXI from "pixi.js";
import { inRange, random } from "lodash";
import { Config } from "../config";

export class Car {
  public sprite: PIXI.Sprite;
  public maxSpeed: number;
  public speed: number;
  public laneNumber: number;
  private app: PIXI.Application;

  constructor(
    app: PIXI.Application,
    laneNumber: number,
    carImage = Config.randomCarImage()
  ) {
    this.app = app;
    this.sprite = this.createSprite(carImage);
    this.maxSpeed = random(3.0, 4.0, true);
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

  public isFullyVisible = (): boolean => {
    return inRange(this.sprite.x, Config.carLength, this.app.renderer.width);
  };

  public isFullyHidden = (): boolean => {
    return !inRange(
      this.sprite.x,
      1,
      this.app.renderer.width + Config.carLength
    );
  };

  public isCloseToCar = (car: Car): boolean => {
    if (this.laneNumber !== car.laneNumber) {
      return false;
    }

    return (
      this.sprite.position.x + Config.minDistanceBetweenCars >=
      car.sprite.position.x - Config.carLength
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
