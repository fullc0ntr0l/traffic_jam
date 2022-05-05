import { createMachine, sendParent } from "xstate";
import { App } from "../elements/app";
import { Car } from "../elements/car";
import { Config } from "../config";

interface ICarContext {
  app: App;
  car: Car;
}

export const carMachine = createMachine<ICarContext>(
  {
    initial: "drive",

    states: {
      drive: {
        invoke: {
          src:
            ({ app, car }) =>
            () => {
              const tickerCallback = () => {
                if (car.isCloseToFrontCar()) {
                  car.speed = car.frontCar!.speed;
                }
              };

              app.pixiApp.ticker.add(tickerCallback);

              return () => app.pixiApp.ticker.remove(tickerCallback);
            },
        },
        on: {
          FINISH: "stop",
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

    after: {
      NEW_CAR_DELAY: {
        actions: sendParent(({ car }) => ({
          type: "NEW_CAR",
          laneNumber: car.laneNumber,
          frontCar: car,
        })),
      },
      CAR_LIFESPAN: { target: "stop" },
    },
  },
  {
    delays: {
      NEW_CAR_DELAY: Config.randomCarSpawnTime,
      CAR_LIFESPAN: Config.carLifespan,
    },
  }
);

export const carMachineWithContext = (app: App, car: Car, frontCar?: Car) => {
  if (frontCar) {
    car.frontCar = frontCar;
    frontCar.followingCar = car;
  }

  return carMachine.withContext({ app, car });
};
