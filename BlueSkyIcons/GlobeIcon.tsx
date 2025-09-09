import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const GlobeIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1M3.057 13a9.005 9.005 0 0 0 6.669 7.709A16.3 16.3 0 0 1 7.05 13zm13.892 0a16.3 16.3 0 0 1-2.676 7.709A9.005 9.005 0 0 0 20.943 13zm-7.887 0A14.3 14.3 0 0 0 12 20.444 14.3 14.3 0 0 0 14.938 13zm5.211-9.71A16.3 16.3 0 0 1 16.95 11h3.994a9.01 9.01 0 0 0-6.67-7.71M12 3.555A14.3 14.3 0 0 0 9.062 11h5.877A14.3 14.3 0 0 0 12 3.555M9.726 3.29A9.01 9.01 0 0 0 3.056 11h3.995a16.3 16.3 0 0 1 2.675-7.71" />
    </Svg>
  );
};
