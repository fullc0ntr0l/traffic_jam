import * as PIXI from "pixi.js";
import { range } from "lodash";
import { createMachine, assign, spawn } from "xstate";
import { carMachineWithContext } from "./car";
import { App } from "../elements/app";
import { Car } from "../elements/car";
import { Config } from "../config";

interface IContex {
  app: App;
  cars: any[];
}

const pixiApp = new PIXI.Application({
  width: Config.appWidth,
  height: Config.appHeight,
  backgroundColor: Config.appBackgroundColor,
});

export const roadMachine = createMachine<IContex>(
  {
    context: {
      app: new App(pixiApp),
      cars: [],
    },

    initial: "open",

    states: {
      open: {
        on: {
          NEW_CAR: {
            actions: ["spawnNewCar"],
          },
        },
        invoke: {
          src: () => (callback) => {
            range(1, Config.numberOfLanes + 1).forEach((laneNumber) =>
              callback({ type: "NEW_CAR", laneNumber })
            );
          },
        },
      },
      closed: {
        type: "final",
      },
    },

    entry: ({ app }) => app.load(),
  },
  {
    actions: {
      spawnNewCar: assign(({ app, cars }, { laneNumber, frontCar }) => {
        const car = new Car(laneNumber);

        return {
          cars: [...cars, spawn(carMachineWithContext(app, car, frontCar))],
        };
      }),
    },
  }
);
