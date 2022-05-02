import * as PIXI from "pixi.js";
import { Road } from "../elements/road";

export class App {
  public pixiApp: PIXI.Application;
  public road: Road;
  private loaded: boolean;

  constructor(pixiApp: PIXI.Application) {
    this.pixiApp = pixiApp;
    this.road = new Road(pixiApp);
    this.loaded = false;
  }

  public load = () => {
    if (this.loaded) {
      console.warn("PIXI application already loaded.");
      return;
    }

    this.pixiApp.loader.onComplete.add(this.drawRoad);
    this.pixiApp.loader.load();
    this.showFPS();

    this.loaded = true;
  };

  private drawRoad = () => {
    const rootElement = document.getElementById("root");
    rootElement!.replaceChildren();
    rootElement!.appendChild(this.pixiApp.view);

    this.pixiApp.stage.removeChildren();
    this.pixiApp.stage.addChild(this.road.container);
  };

  private getFPSText = () => `FPS: ${Math.round(this.pixiApp.ticker.FPS)}`;

  private showFPS = () => {
    const textContainer = new PIXI.Container();
    const fpsText = new PIXI.Text(this.getFPSText(), {
      fontFamily: "Arial",
      fontSize: 14,
      fill: 0xffffff,
      align: "left",
      stroke: "black",
      strokeThickness: 4,
    });

    fpsText.x = this.pixiApp.renderer.width - fpsText.width - 2;
    fpsText.y = 2;
    textContainer.addChild(fpsText);
    textContainer.zIndex = 100;
    this.pixiApp.stage.addChild(textContainer);

    this.pixiApp.ticker.add(() => {
      fpsText.text = this.getFPSText();
    });
  };
}
