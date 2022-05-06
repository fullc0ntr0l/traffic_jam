import { createMachine, sendParent } from "xstate";
import { App } from "../elements/app";
import { Car } from "../elements/car";
import { Config } from "../config";

interface ICarContext {
  app: App;
  car: Car;
}

export const carMachine = createMachine<ICarContext>({
  initial: "drive",

  states: {
    drive: {
      invoke: {
        src:
          ({ app, car }) =>
          (callback) => {
            const tickerCallback = () => {
              if (car.isCloseToFrontCar()) {
                car.speed = car.frontCar!.speed;
              }

              if (car.hasJustPassedPoint(Config.carLength)) {
                callback("NEW_CAR");
              }

              if (car.hasJustPassedPoint(Config.carLength + app.pixiApp.renderer.width)) {
                callback("FINISH");
              }
            };

            // const onMouseClick = () => {
            //   if (car.followingCar) {
            //     car.changeLane(car.laneNumber + 1);

            //     car.followingCar.accelerate();
            //   }
            // };

            app.pixiApp.ticker.add(tickerCallback);
            // car.sprite.on("mousedown", onMouseClick);

            return () => {
              // car.sprite.off("mousedown", onMouseClick);
              app.pixiApp.ticker.remove(tickerCallback);
            };
          },
      },
    },

    stop: {
      entry: ({ car }) => {
        car.followingCar!.frontCar = undefined;
        car.followingCar = undefined;
      },
      type: "final",
    },
  },

  on: {
    NEW_CAR: {
      actions: sendParent(
        ({ car }) => ({
          type: "NEW_CAR",
          laneNumber: car.laneNumber,
          frontCar: car,
        }),
        { delay: Config.randomCarSpawnTime() }
      ),
    },
    FINISH: { target: "stop" },
  },

  invoke: {
    src:
      ({ app, car }) =>
      () => {
        app.road.container.addChild(car.sprite);
        app.pixiApp.ticker.add(car.drive);

        return () => {
          app.pixiApp.ticker.remove(car.drive);
          app.road.container.removeChild(car.sprite);
        };
      },
  },
});

export const carMachineWithContext = (app: App, car: Car, frontCar?: Car) => {
  if (frontCar) {
    car.frontCar = frontCar;
    frontCar.followingCar = car;
  }

  return carMachine.withContext({ app, car });
};
