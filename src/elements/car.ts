import * as PIXI from "pixi.js";
import { Cars, ICarConfiguration } from "../configs/cars";
import { Dimensions } from "../configs/dimensions";

const STARTING_POSITION = -200;

export class Car {
  public sprite: PIXI.Sprite;
  private app: PIXI.Application;
  private laneNumber: number;
  private configuration: ICarConfiguration;

  constructor(
    app: PIXI.Application,
    laneNumber: number,
    configuration = Cars.randomConfiguration()
  ) {
    this.app = app;
    this.laneNumber = laneNumber;
    this.configuration = configuration;
    this.sprite = this.createSprite();
  }

  private createSprite() {
    const sprite = PIXI.Sprite.from(
      Cars.imageForConfiguration(this.configuration)
    );
    sprite.anchor.set(0.5);
    sprite.angle = 180;
    sprite.x = 0;
    sprite.y = this.calculateY();
    sprite.width = Cars.carLength;
    sprite.height = Cars.carWidth;

    this.app.ticker.add(() => {
      if (sprite.x > this.app.renderer.width + 200) {
        sprite.x = STARTING_POSITION;
      } else {
        sprite.x += this.configuration.maxSpeed / 25;
      }
    });

    return sprite;
  }

  private calculateY(): number {
    return (
      Dimensions.roadPadding +
      Dimensions.lanesSeparatorWidth +
      Dimensions.laneTotalWidth / 2 +
      (this.laneNumber - 1) *
        (Dimensions.laneTotalWidth + Dimensions.lanesSeparatorWidth)
    );
  }
}
