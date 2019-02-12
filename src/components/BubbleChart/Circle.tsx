import * as React from "react";
import { Group } from "@vx/group";
import { Text } from "@vx/text";
import numeral from "numeral";

const Circle = ({ circle }) => {
  const populationText = numeral(circle.value * 1000).format("0,0") + " чел.";
  const densityText = numeral(circle.data.density).format("0,0") + " чел./км";
  const subtitleFontSize = (circle.r / populationText.length) * 1.8;

  return (
    <Group transform={"translate(" + circle.x + "," + circle.y + ")"}>
      <circle r={circle.r} cx={0} cy={0} fill={circle.data.color} />

      <Text
        dy="-.08em"
        textAnchor="middle"
        fontWeight="bold"
        fill="#FFF"
        fontSize={(circle.r / circle.data.name.length) * 2.5 + "px"}
      >
        {circle.data.name}
      </Text>

      <Text
        dy="1.2em"
        textAnchor="middle"
        fontWeight="300"
        fill="#FFF"
        fontSize={`${subtitleFontSize}px`}
      >
        {populationText}
      </Text>

      <Text
        dy="2.4em"
        textAnchor="middle"
        fontWeight="300"
        fill="#FFF"
        fontSize={`${subtitleFontSize}px`}
      >
        {densityText}
      </Text>
    </Group>
  );
};

export default React.memo(Circle);
