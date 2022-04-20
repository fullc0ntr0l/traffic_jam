import * as PIXI from "pixi.js";
import { debounce } from "lodash";
import { Cars } from "./configs/cars";
import { Road } from "./elements/road";

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x22b14c,
  autoDensity: true,
});

Cars.configurations.forEach((configuration) => {
  const imagePath = Cars.imageForConfiguration(configuration);

  app.loader.add(`car-${configuration.name}`, imagePath);
});

app.loader.onComplete.add(drawTraffic);
app.loader.load();

window.addEventListener("resize", debounce(drawTraffic, 500));
window.addEventListener("resize", () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
  app.render();
});

function drawTraffic() {
  const rootElement = document.getElementById("root");
  rootElement!.replaceChildren();
  rootElement!.appendChild(app.view);

  const road = new Road(app).createContainer();
  app.stage.removeChildren();
  app.stage.addChild(road);

  // app.ticker.add(() => {
  //   console.log("tick");
  // });
}
