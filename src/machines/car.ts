import { createMachine, sendParent } from "xstate";
import { App } from "../elements/app";
import { Car } from "../elements/car";

type CarVisibility = "hidden" | "visible" | undefined;

interface ICarContext {
  app: App;
  car: Car;
}

export const carMachine = createMachine<ICarContext>({
  initial: "drive",

  states: {
    drive: {
      invoke: {
        id: "driveCar",
        src:
          ({ app, car }) =>
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
            };

            app.pixiApp.ticker.add(tickerCallback);

            return () => app.pixiApp.ticker.remove(tickerCallback);
          },
      },
      on: {
        NEW_CAR: {
          actions: sendParent(
            (_, { laneNumber }) => ({ type: "NEW_CAR", laneNumber }),
            { delay: 100 }
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
});

export const carMachineWithContext = (app: App, laneNumber: number) => {
  return carMachine.withContext({
    app,
    car: new Car(app.pixiApp, laneNumber),
  });
};
