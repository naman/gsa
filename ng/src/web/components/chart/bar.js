/* Greenbone Security Assistant
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2018 Greenbone Networks GmbH
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */
import React from 'react';

import {css} from 'glamor';

import {Bar} from '@vx/shape';
import {Group} from '@vx/group';
import {AxisLeft, AxisBottom} from '@vx/axis';
import {scaleBand, scaleLinear} from '@vx/scale';

import Layout from '../layout/layout';

import PropTypes from '../../utils/proptypes';

import Legend from './legend';
import ToolTip from './tooltip';

const lineCss = css({
  shapeRendering: 'crispEdges',
});

const margin = {
  top: 40,
  right: 20,
  bottom: 40,
  left: 60,
};

const BarChart = ({
  data,
  height,
  width,
  xLabel,
  yLabel,
}) => {
  const maxWidth = width - margin.left - margin.right;
  const maxHeight = height - margin.top - margin.bottom;

  const xValues = data.map(d => d.x);
  const yValues = data.map(d => d.y);
  const yMax = Math.max(...yValues);

  const xScale = scaleBand({
    rangeRound: [0, maxWidth],
    domain: xValues,
    padding: 0.125,
  });

  const yScale = scaleLinear({
    range: [maxHeight, 0],
    domain: [0, yMax],

    /*
      nice seems to round first and last value.
      see https://github.com/d3/d3-scale/blob/master/README.md#continuous_nice
      the old version did call nice(10) which isn't possible with vx at the moment.
    */
    nice: true,
  });

  return (
    <Layout align={['start', 'start']}>
      <svg width={width} height={height}>
        <Group top={margin.top} left={margin.left}>
          <AxisLeft
            axisLineClassName={`${lineCss}`}
            tickClassName={`${lineCss}`}
            scale={yScale}
            top={0}
            left={0}
            label={yLabel}
            numTicks={10}
            rangePadding={-8} // - tickLength
          />
          <AxisBottom
            axisLineClassName={`${lineCss}`}
            tickClassName={`${lineCss}`}
            scale={xScale}
            top={maxHeight}
            label={xLabel}
            rangePadding={8} // tickLength
          />
          {data.map((d, i) => (
            <ToolTip
              key={i}
              content={d.toolTip}
            >
              {({targetRef, hide, show}) => (
                <Bar
                  innerRef={targetRef}
                  fill={d.color}
                  x={xScale(d.x)}
                  y={yScale(d.y)}
                  width={xScale.bandwidth()}
                  height={maxHeight - yScale(d.y)}
                  onMouseOver={() => show}
                  onMouseOut={() => hide}
                />
              )}
            </ToolTip>
          ))}
        </Group>
      </svg>
      <Legend data={data}/>
    </Layout>
  );
};

BarChart.propTypes = {
  /*
    Required array structure for data:

    [{
      x: ...,
      y: ...,
      toolTip: ...,
      color: ...,
      label: ...,
    }]
  */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
};

export default BarChart;

// vim: set ts=2 sw=2 tw=80:
