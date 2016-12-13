/* Greenbone Security Assistant
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2016 Greenbone Networks GmbH
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

import _ from '../locale.js';

import Section from './section.js';

import {Dashboard, DashboardControls} from './dashboard/dashboard.js';

import TaskCharts from './tasks/charts.js';
import ReportCharts from './reports/charts.js';
import ResultCharts from './results/charts.js';
import NoteCharts from './notes/charts.js';
import OverrideCharts from './overrides/charts.js';
import HostCharts from './hosts/charts.js';
import OsCharts from './os/charts.js';
import NvtCharts from './nvts/charts.js';
import OvaldefCharts from './ovaldefs/charts.js';
import CertBundCharts from './certbund/charts.js';
import CveCharts from './cves/charts.js';
import CpeCharts from './cpes/charts.js';
import DfnCertCharts from './dfncert/charts.js';
import SecinfoCharts from './secinfo/charts.js';

export const Home = () => {
  return (
    <Section title={_('Dashboard')} img="dashboard.svg"
      extra={<DashboardControls/>}>
      <Dashboard
        conf-pref-id="d97eca9f-0386-4e5d-88f2-0ed7f60c0646"
        default-controllers-string={'task-by-severity-class|task-by-status#' +
          'cve-by-created|host-by-topology|nvt-by-severity-class'}
        default-controller-string="task-by-severity-class"
        max-components="8">
        <TaskCharts/>
        <ReportCharts/>
        <ResultCharts/>
        <NoteCharts/>
        <OverrideCharts/>
        <HostCharts/>
        <OsCharts/>
        <NvtCharts/>
        <OvaldefCharts/>
        <CertBundCharts/>
        <CveCharts/>
        <CpeCharts/>
        <DfnCertCharts/>
        <SecinfoCharts/>
      </Dashboard>
    </Section>
  );
};

export default Home;

// vim: set ts=2 sw=2 tw=80:
