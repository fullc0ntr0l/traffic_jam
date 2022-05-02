import * as PIXI from "pixi.js";
import { inRange } from "lodash";
import { Cars, ICarConfiguration } from "../configs/cars";
import { Dimensions } from "../configs/dimensions";

export class Car {
  public sprite: PIXI.Sprite;
  public configuration: ICarConfiguration;
  public laneNumber: number;
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
    this.changeLane(laneNumber);
  }

  public drive = () => {
    this.sprite.x += this.configuration.maxSpeed;
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
