import * as PIXI from "pixi.js";
import { range } from "lodash";
import { createMachine, assign, spawn } from "xstate";
import { carMachineWithContext } from "./car";
import { App } from "../elements/app";
import { Dimensions } from "../configs/dimensions";

interface IContex {
  app: App;
  cars: any[];
}

const pixiApp = new PIXI.Application({
  width: 640,
  height: 320,
  backgroundColor: 0x22b14c,
});

export const roadMachine = createMachine<IContex>({
  context: {
    app: new App(pixiApp),
    cars: [],
  },

  initial: "open",

  states: {
    open: {
      on: {
        NEW_CAR: {
          actions: assign({
            cars: (context, event) => [
              ...context.cars,
              spawn(
                carMachineWithContext(context.app, event.laneNumber),
                `car-${event.id}`
              ),
            ],
          }),
        },
      },
      invoke: {
        id: "newCarInterval",
        src: () => (callback) => {
          range(1, Dimensions.numberOfLanes + 1).forEach((laneNumber) => {
            callback({ type: "NEW_CAR", laneNumber });
          });
        },
      },
    },
    closed: {},
  },

  entry: ({ app }) => app.load(),
});
