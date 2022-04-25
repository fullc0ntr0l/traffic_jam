import * as PIXI from "pixi.js";
import { range } from "lodash";
import { Dimensions } from "../configs/dimensions";

export class Road {
  public container: PIXI.Container;
  private app: PIXI.Application;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.container = this.createContainer();
  }

  private createContainer() {
    const container = new PIXI.Container();

    container.x = 0;
    container.y = this.app.renderer.height / 2 - Dimensions.roadTotalWidth / 2;
    container.height = Dimensions.roadTotalWidth;
    container.width = this.app.renderer.width;

    container.addChild(this.createSurface());
    container.addChild(this.createSeparatingLines());

    return container;
  }

  private createSurface() {
    const graphics = new PIXI.Graphics();

    graphics.clear();
    graphics.beginFill(0x484848);
    graphics.drawRect(0, 0, this.app.renderer.width, Dimensions.roadTotalWidth);
    graphics.endFill();

    return graphics;
  }

  private createSeparatingLines() {
    const graphics = new PIXI.Graphics();

    graphics.clear();
    graphics.beginFill(0xffffff);

    // Draw continuous lines at the margins
    graphics.drawRect(
      0,
      Dimensions.roadPadding,
      this.app.renderer.width,
      Dimensions.lanesSeparatorWidth
    );
    graphics.drawRect(
      0,
      Dimensions.roadTotalWidth -
        Dimensions.roadPadding -
        Dimensions.lanesSeparatorWidth,
      this.app.renderer.width,
      Dimensions.lanesSeparatorWidth
    );

    // Draw dashed lines between lanes
    range(
      -(Dimensions.dashedLinesLength / 2),
      this.app.renderer.width,
      Dimensions.dashedLinesLength * 1.5
    ).forEach((x) => {
      range(
        Dimensions.roadPadding +
          Dimensions.lanesSeparatorWidth +
          Dimensions.laneTotalWidth,
        Dimensions.roadTotalWidth -
          Dimensions.roadPadding -
          Dimensions.lanesSeparatorWidth,
        Dimensions.laneTotalWidth + Dimensions.lanesSeparatorWidth
      ).forEach((y) => {
        graphics.drawRect(
          x,
          y,
          Dimensions.dashedLinesLength,
          Dimensions.lanesSeparatorWidth
        );
      });
    });
    graphics.endFill();

    return graphics;
  }
}
