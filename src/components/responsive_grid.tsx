import { Col, Row } from "antd";
import React from "react";

type Size = {
    sm: number,
    md: number,
    lg: number,
    xl: number,
    xxl: number
}

type ResponsiveGridCols = {
    size: Size,
    component?: JSX.Element
}

type ResponsiveGridType = {
    cols: ResponsiveGridCols[]
}

export const ResponsiveGrid: React.FC<ResponsiveGridType> = ({ cols }) => {
    return <Row>
        {cols.map(({ size, component }, index) => {
            return <Col key={`column-${index}`} {...size}>
                {component}
            </Col>
        })}
    </Row>
}