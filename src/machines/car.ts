import { createMachine, sendParent } from "xstate";
import { random } from "lodash";
import { App } from "../elements/app";
import { Car } from "../elements/car";

type CarVisibility = "hidden" | "visible" | undefined;

interface ICarContext {
  app: App;
  car: Car;
  frontCar?: Car;
}

export const carMachine = createMachine<ICarContext>(
  {
    initial: "drive",

    states: {
      drive: {
        invoke: {
          id: "driveCar",
          src:
            ({ app, car, frontCar }) =>
            (callback) => {
              let visibility: CarVisibility;
              const tickerCallback = () => {
                car.drive();

                if (car.isFullyVisible()) {
                  if (visibility !== "visible") {
                    callback({ type: "NEW_CAR", laneNumber: car.laneNumber });
                  }

                  visibility = "visible";
                }

                if (car.isFullyHidden()) {
                  if (visibility !== "hidden") {
                    callback("FINISH");
                  }

                  visibility = "hidden";
                }

                if (frontCar && car.isCloseToCar(frontCar)) {
                  car.speed = frontCar.speed;
                }
              };

              app.pixiApp.ticker.add(tickerCallback);

              return () => app.pixiApp.ticker.remove(tickerCallback);
            },
        },
        on: {
          NEW_CAR: {
            actions: sendParent(
              (context, { laneNumber }) => ({
                type: "NEW_CAR",
                laneNumber,
                frontCar: context.car,
              }),
              { delay: "NEW_CAR_DELAY" }
            ),
          },
          FINISH: "exit",
        },
      },
      exit: {
        type: "final",
        entry: (context) => {
          context.app.road.container.removeChild(context.car.sprite);
        },
      },
    },

    entry: (context) => {
      context.app.road.container.addChild(context.car.sprite);
    },
  },
  {
    delays: {
      NEW_CAR_DELAY: () => random(500, 1500),
    },
  }
);

export const carMachineWithContext = (
  app: App,
  laneNumber: number,
  frontCar?: Car
) => {
  return carMachine.withContext({
    app,
    car: new Car(app.pixiApp, laneNumber),
    frontCar,
  });
};
