import { addAreas, addArea, updateArea, deleteArea } from "../store/area/slice";
import { useAppDispatch } from "./store";

export const useAreaActions = () => {
  const dispatch = useAppDispatch();

  const addAreasAction = (areas: any[]) => {
    dispatch(addAreas(areas));
  };

  const addAreaAction = (area: any) => {
    dispatch(addArea(area));
  };

  const updateAreaAction = (area: any) => {
    dispatch(updateArea(area));
  };

  const deleteAreaAction = (areaId: number) => {
    dispatch(deleteArea(areaId));
  };

  return {
    addAreas: addAreasAction,
    addArea: addAreaAction,
    updateArea: updateAreaAction,
    deleteArea: deleteAreaAction,
  };
};
