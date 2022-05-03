import * as PIXI from "pixi.js";
import { range } from "lodash";
import { Config } from "../config";

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
    container.y = this.app.renderer.height / 2 - Config.roadTotalWidth / 2;
    container.height = Config.roadTotalWidth;
    container.width = this.app.renderer.width;

    container.addChild(this.createSurface());
    container.addChild(this.createSeparatingLines());

    return container;
  }

  private createSurface() {
    const graphics = new PIXI.Graphics();

    graphics.clear();
    graphics.beginFill(0x484848);
    graphics.drawRect(0, 0, this.app.renderer.width, Config.roadTotalWidth);
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
      Config.roadPadding,
      this.app.renderer.width,
      Config.lanesSeparatorWidth
    );
    graphics.drawRect(
      0,
      Config.roadTotalWidth - Config.roadPadding - Config.lanesSeparatorWidth,
      this.app.renderer.width,
      Config.lanesSeparatorWidth
    );

    // Draw dashed lines between lanes
    range(
      -(Config.dashedLinesLength / 2),
      this.app.renderer.width,
      Config.dashedLinesLength * 1.5
    ).forEach((x) => {
      range(
        Config.roadPadding + Config.lanesSeparatorWidth + Config.laneTotalWidth,
        Config.roadTotalWidth - Config.roadPadding - Config.lanesSeparatorWidth,
        Config.laneTotalWidth + Config.lanesSeparatorWidth
      ).forEach((y) => {
        graphics.drawRect(
          x,
          y,
          Config.dashedLinesLength,
          Config.lanesSeparatorWidth
        );
      });
    });
    graphics.endFill();

    return graphics;
  }
}
