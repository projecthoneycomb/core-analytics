import React from "react";
import PropTypes from "prop-types";
import { useCubeQuery } from "@cubejs-client/react";
import { Spin, Row, Col, Statistic, Table } from "antd";
import { Chart, Axis, Tooltip, Geom, Coord, Legend } from "bizcharts";

function getOrdinalNum(n) {
  return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}

const stackedChartData = resultSet => {
  const data = resultSet
    .pivot()
    .map(({ xValues, yValuesArray }) => {
        return yValuesArray.map(([yValues, m]) => {
          let dateValue = new Date(xValues[0])
          let x = `${getOrdinalNum(dateValue.getDate())} - ${dateValue.getHours()}:00`
          let y = yValues[0]
          if (y.match('open_')) {
            y = y.replace('open_', '').replace(/_/g, '.');
          } else {
            if (y.match('_')) {
              y = y.replace(/_/g, ' ').toProperCase();
            }
          }

          return {
            x,
            color: y,
            measure: m && Number.parseFloat(m)
          }
        })
      }
    )
    .reduce((a, b) => a.concat(b), []);
  return data;
};


const TypeToChartComponent = {
  line: ({ resultSet }) => (
    <Chart
      scale={{
        x: {
          tickCount: 8
        }
      }}
      height={400}
      data={stackedChartData(resultSet)}
      forceFit
    >
      <Axis name="x" />
      <Axis name="measure" />
      <Tooltip
        crosshairs={{
          type: "y"
        }}
      />
      <Geom type="line" position={`x*measure`} size={2} color="color" />
    </Chart>
  ),
  bar: ({ resultSet }) => (
    <Chart
      scale={{
        x: {
          tickCount: 8
        }
      }}
      height={400}
      data={stackedChartData(resultSet)}
      forceFit
    >
      <Axis name="x" />
      <Axis name="measure" />
      <Tooltip />
      <Geom type="intervalStack" position={`x*measure`} color="color" />
    </Chart>
  ),
  area: ({ resultSet }) => (
    <Chart
      scale={{
        x: {
          tickCount: 8
        }
      }}
      height={400}
      data={stackedChartData(resultSet)}
      forceFit
    >
      <Axis name="x" />
      <Axis name="measure" />
      <Tooltip
        crosshairs={{
          type: "y"
        }}
      />
      <Geom type="areaStack" position={`x*measure`} size={2} color="color" />
    </Chart>
  ),
  pie: ({ resultSet }) => (
    <Chart height={400} data={resultSet.chartPivot()} forceFit>
      <Coord type="theta" radius={0.75} />
      {resultSet.seriesNames().map(s => (
        <Axis name={s.key} />
      ))}
      <Legend position="right" />
      <Tooltip />
      {resultSet.seriesNames().map(s => (
        <Geom type="intervalStack" position={s.key} color="category" />
      ))}
    </Chart>
  ),
  table: ({ resultSet }) => (
    <Table
      pagination={false}
      columns={resultSet.tableColumns().map(c => ({ ...c, dataIndex: c.key }))}
      dataSource={resultSet.tablePivot()}
    />
  ),
  number: ({ resultSet }) => (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{
        height: "100%"
      }}
    >
      <Col>
        {resultSet.seriesNames().map(s => (
          <Statistic value={resultSet.totalRow()[s.key]} />
        ))}
      </Col>
    </Row>
  )
};
const TypeToMemoChartComponent = Object.keys(TypeToChartComponent)
  .map(key => ({
    [key]: React.memo(TypeToChartComponent[key])
  }))
  .reduce((a, b) => ({ ...a, ...b }));

const renderChart = Component => ({ resultSet, error }) =>
  (resultSet && <Component resultSet={resultSet} />) ||
  (error && error.toString()) || <Spin />;

const ChartRenderer = ({ vizState }) => {
  const { query, chartType } = vizState;
  const component = TypeToMemoChartComponent[chartType];
  const renderProps = useCubeQuery(query);
  return component && renderChart(component)(renderProps);
};

ChartRenderer.propTypes = {
  vizState: PropTypes.object,
  cubejsApi: PropTypes.object
};
ChartRenderer.defaultProps = {
  vizState: {},
  cubejsApi: null
};
export default ChartRenderer;
