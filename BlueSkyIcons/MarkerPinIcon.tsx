import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const MarkerPinIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M19 10a7 7 0 1 0-14 0c0 1.892.853 3.678 2.292 5.547 1.28 1.662 2.937 3.285 4.708 5.043 1.77-1.758 3.428-3.381 4.708-5.043C18.148 13.678 19 11.892 19 10m-5 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0m2 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0m5 0c0 2.526-1.147 4.74-2.708 6.767-1.551 2.014-3.618 3.973-5.585 5.94a1 1 0 0 1-1.414 0c-1.967-1.967-4.034-3.926-5.585-5.94C4.148 14.74 3 12.527 3 10a9 9 0 0 1 18 0" />
    </Svg>
  );
};
