import * as React from "react";
import { Pack } from "@vx/hierarchy";
import { hierarchy } from "d3-hierarchy";
import { Group } from "@vx/group";
import { Zoom } from "@vx/zoom";
import { localPoint } from "@vx/event";

import { flatCountriesData } from "../../data/countries";
import Circle from "./Circle";

const initialTransform = {
  scaleX: 1,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  skewX: 0,
  skewY: 0
};

const data = hierarchy(flatCountriesData())
  .sum((d: any) => d.population)
  .sort(() => 0);

export default ({ width, height }) => {
  return (
    <Zoom
      width={width}
      height={height}
      scaleXMin={1}
      scaleXMax={16}
      scaleYMin={1}
      scaleYMax={16}
      transformMatrix={initialTransform}
    >
      {zoom => {
        return (
          <svg
            width={width}
            height={height}
            style={{ cursor: zoom.isDragging ? "grabbing" : "grab" }}
            fill="transparent"
            onWheel={zoom.handleWheel}
            onMouseDown={zoom.dragStart}
            onMouseMove={zoom.dragMove}
            onMouseUp={zoom.dragEnd}
            onMouseLeave={() => {
              if (!zoom.isDragging) return;
              zoom.dragEnd();
            }}
            onDoubleClick={event => {
              const point = localPoint(event);
              zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
            }}
          >
            <rect width={width} height={height} fill="#FABE05" />
            <g transform={zoom.toString()}>
              <Pack root={data} size={[width, height]} padding={0} sort={null}>
                {pack => {
                  const circles = pack.descendants().slice(2);

                  return (
                    <Group top={0} left={0}>
                      {circles.map(circle => (
                        <Circle circle={circle} key={circle.data.name} />
                      ))}
                    </Group>
                  );
                }}
              </Pack>
            </g>
          </svg>
        );
      }}
    </Zoom>
  );
};
