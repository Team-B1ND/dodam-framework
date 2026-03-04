import { useContext } from "react";
import { ParamsContext } from "../core/params-context";

export const useParams = () => {
  return useContext(ParamsContext);
}