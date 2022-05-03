import * as PIXI from "pixi.js";
import { inRange, random } from "lodash";
import { Cars, ICarConfiguration } from "../configs/cars";
import { Dimensions } from "../configs/dimensions";

export class Car {
  public sprite: PIXI.Sprite;
  public configuration: ICarConfiguration;
  public laneNumber: number;
  public maxSpeed: number;
  public speed: number;
  private app: PIXI.Application;

  constructor(
    app: PIXI.Application,
    laneNumber: number,
    configuration = Cars.randomConfiguration()
  ) {
    this.app = app;
    this.configuration = configuration;
    this.sprite = this.createSprite();
    this.laneNumber = laneNumber;
    this.maxSpeed = random(3.0, 4.0);
    this.speed = this.maxSpeed;
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
    return inRange(this.sprite.x, Cars.carLength, this.app.renderer.width);
  };

  public isFullyHidden = (): boolean => {
    return !inRange(this.sprite.x, 1, this.app.renderer.width + Cars.carLength);
  };

  public isCloseToCar = (car: Car): boolean => {
    if (this.laneNumber !== car.laneNumber) {
      return false;
    }

    return (
      this.sprite.position.x + Dimensions.minDistanceBetweenCars >=
      car.sprite.position.x - Cars.carLength
    );
  };

  private createSprite = () => {
    const image = Cars.imageForConfiguration(this.configuration);
    const sprite = PIXI.Sprite.from(image);
    sprite.anchor.set(0, 0.5);
    sprite.angle = 180;
    sprite.x = 0;
    sprite.y = 0;
    sprite.width = Cars.carLength;
    sprite.height = Cars.carWidth;

    return sprite;
  };

  private calculateY = (laneNumber: number): number => {
    return (
      Dimensions.roadPadding +
      Dimensions.lanesSeparatorWidth +
      Dimensions.laneTotalWidth / 2 +
      (laneNumber - 1) *
        (Dimensions.laneTotalWidth + Dimensions.lanesSeparatorWidth)
    );
  };
}
