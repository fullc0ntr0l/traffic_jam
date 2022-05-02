import { roadMachine } from "./machines/road";
import { interpret } from "xstate";

interpret(roadMachine).start();
