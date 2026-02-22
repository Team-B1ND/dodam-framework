import { RequestType } from "../../../shared/types/enums/request-type";
import { Handler } from "./handler";

export type BridgeHandlerMap = Map<RequestType, Handler>;
