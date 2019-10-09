import * as Vibrant from "node-vibrant";
import { isEqual, sortBy } from "lodash";

const updateBackgroundColor = (imageUrl, currentBackgroundColor, setBackgroundAction) => {
  return Vibrant.from(imageUrl)
    .getPalette()
    .then(palette => {
      if (!isEqual(_.sortBy(palette.Vibrant.rgb), sortBy(currentBackgroundColor))) {
        setBackgroundAction(palette.Vibrant.rgb);
        return true;
      } else {
        return false;
      }
    })
    .then(value => {
      return value;
    });
};

export default updateBackgroundColor;
