import React, { CSSProperties, FunctionComponent } from "react";
import { Operation } from "./types/operation";
import { getClientColor } from "./sharedStyles";
import { OperationVisualization } from "./OperationVisualization";

interface Point {
  x: number;
  y: number;
}

const SvgArrow: FunctionComponent<{
  start: Point;
  end: Point;
  shaftWidth: number;
  tipLength: number;
  tipWidth: number;
  color: string;
}> = ({ start, end, shaftWidth, tipLength, tipWidth, color }) => {
  const diffX = end.x - start.x;
  const diffY = end.y - start.y;
  const length = Math.sqrt(diffX * diffX + diffY * diffY);
  const tipToShaftLength = (tipWidth - shaftWidth) / 2;
  const shaftLength = length - tipLength;

  return (
    <path
      fill={color}
      transform={`matrix(${diffX / length}, ${diffY / length}, ${-diffY / length}, ${
        diffX / length
      }, ${start.x}, ${start.y})`}
      d={`m ${length},0 -${tipLength},-${
        tipWidth / 2
      } 0,${tipToShaftLength} -${shaftLength},0 0,${shaftWidth} ${shaftLength},0 0,${tipToShaftLength} z`}
    />
  );
};

const operationArrowStyle = {
  shaftWidth: 10,
  tipLength: 24,
  tipWidth: 20,
};

const interpolate = (lambda: number, start: Point, end: Point): Point => ({
  x: (1 - lambda) * start.x + lambda * end.x,
  y: (1 - lambda) * start.y + lambda * end.y,
});

interface ArrowDiagramProps {
  width: number;
  height: number;
  arrows: { operation: Operation; start: Point; end: Point }[];
}

export const ArrowDiagram: FunctionComponent<ArrowDiagramProps> = ({ width, height, arrows }) => {
  return (
    <div
      style={{
        position: "relative",
        width: `${width}px`,
        height: `${height}px`,
        margin: "0 auto",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        style={{ position: "absolute", opacity: "0.2" }}
      >
        {arrows.map(({ operation, start, end }, i) => (
          <SvgArrow
            key={i}
            start={interpolate(0.1, start, end)}
            end={interpolate(0.95, start, end)}
            color={getClientColor(operation.meta.author)}
            {...operationArrowStyle}
          />
        ))}
      </svg>
      {arrows.map(({ operation, start, end }, i) => {
        const centerPoint = interpolate(0.45, start, end);
        const style: CSSProperties = {
          position: "absolute",
          left: `${centerPoint.x - 10}px`,
          top: `${centerPoint.y - 10}px`,
        };
        return <OperationVisualization key={i} operation={operation} style={style} />;
      })}
    </div>
  );
};