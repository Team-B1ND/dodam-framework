import { useContext } from "react";
import { ParamsContext } from "./params-context";

export const useParams = () => {
  return useContext(ParamsContext);
}