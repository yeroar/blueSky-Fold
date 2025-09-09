import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

interface IProps extends SvgProps {}

export const ArrowCircleUpIcon = (props: IProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path d="M21 12a9 9 0 1 0-18 0 9 9 0 0 0 18 0m-10 4v-5.586l-2.293 2.293a1 1 0 1 1-1.414-1.414l4-4 .076-.068a1 1 0 0 1 1.338.068l4 4 .068.076a1 1 0 0 1-1.406 1.406l-.076-.068L13 10.414V16a1 1 0 1 1-2 0m12-4c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11" />
    </Svg>
  );
};
