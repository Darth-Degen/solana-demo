import { Dispatch, SetStateAction } from "react";
// returns true and updates index in array of image booleans
export const handleAssetLoad = (
  index: number,
  setAssets: Dispatch<SetStateAction<boolean[]>>
) => {
  setAssets((prevState) => [
    ...prevState.slice(0, index),
    true,
    ...prevState.slice(index + 1),
  ]);
};
