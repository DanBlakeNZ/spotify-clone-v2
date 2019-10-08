import * as Vibrant from "node-vibrant";
import { isEqual, sortBy } from "lodash";

const updateBackgroundColor = (imageUrl, currentBackgroundColor, setBackgroundAction) => {
  Vibrant.from(imageUrl)
    .getPalette()
    .then(palette => {
      if (!isEqual(_.sortBy(palette.LightVibrant.rgb), sortBy(currentBackgroundColor))) {
        setBackgroundAction(palette.LightVibrant.rgb);
      }
    });
};

export default updateBackgroundColor;
