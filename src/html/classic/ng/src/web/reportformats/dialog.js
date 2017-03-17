/* Greenbone Security Assistant
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2017 Greenbone Networks GmbH
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

import _ from '../../locale.js';
import {is_defined} from '../../utils.js';

import Layout from '../layout.js';
import PropTypes from '../proptypes.js';
import {withDialog} from '../dialog/dialog.js';

import FileField from '../form/filefield.js';
import FormGroup from '../form/formgroup.js';
import Spinner from '../form/spinner.js';
import TextArea from '../form/textarea.js';
import TextField from '../form/textfield.js';
import Select2 from '../form/select2.js';
import YesNoRadio from '../form/yesnoradio.js';

import Table from '../table/table.js';
import TableBody from '../table/body.js';
import TableData from '../table/data.js';
import TableHeader from '../table/header.js';
import TableHead from '../table/head.js';
import TableRow from '../table/row.js';

const Param = ({
    value,
    data,
    onChange
  }) => {
  let {name, type, min, max} = value;
  let field_value = data[name];

  let field;
  if (type === 'boolean') {
    field = (
      <YesNoRadio
        name={name}
        value={field_value}
        onChange={onChange}
      />
    );
  }
  else if (type === 'integer') {
    field = (
      <Spinner
        type="int"
        name={name}
        min={min}
        max={max}
        value={field_value}
        onChange={onChange}
      />
    );
  }
  else if (type === 'string') {
    field = (
      <TextField
        name={name}
        maxLength={max}
        value={field_value}
        onChange={onChange}
      />
    );
  }
  else if (type === 'selection') {
    // FIXME test options
    field = (
      <Select2
        name={name}
        value={field_value}
        onChange={onChange}
      >
        {value.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </Select2>
    );
  }
  else if (type === 'report_format_list') {
    // TODO implement
  }
  else {
    field = (
      <TextArea
        cols="80"
        rows="5"
        name={name}
        value={field_value}
        onChange={onChange}
      />
    );
  }
  return (
    <TableRow>
      <TableData>
        {name}
      </TableData>
      <TableData>
        {field}
      </TableData>
    </TableRow>
  );
};

Param.propTypes = {
  data: React.PropTypes.object.isRequired,
  value: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

class Dialog extends React.Component {

  constructor(...args) {
    super(...args);

    this.handlePrefChange = this.handlePrefChange.bind(this);
  }

  handlePrefChange(value, name) {
    let {preferences, onValueChange} = this.props;

    preferences[name] = value;

    if (onValueChange) {
      onValueChange(preferences, 'preferences');
    }
  }

  render() {
    const {
      active,
      name,
      preferences,
      reportformat,
      summary,
      onValueChange,
    } = this.props;

    if (is_defined(reportformat)) {
      return (
        <Layout flex="column">
          <FormGroup title={_('Name')}>
            <TextField
              grow="1"
              name="name"
              value={name}
              maxLength="80"
              onChange={onValueChange}
            />
          </FormGroup>

          <FormGroup title={_('Summary')}>
            <TextField
              grow="1"
              name="summary"
              value={summary}
              maxLength="400"
              onChange={onValueChange}
            />
          </FormGroup>

          <FormGroup title={_('Active')}>
            <YesNoRadio
              name="active"
              value={active}
              onChange={onValueChange}
            />
          </FormGroup>

          {reportformat.params.length > 0 &&
            <h2>Parameters</h2>
          }
          {reportformat.params.length > 0 &&
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead width="25%">{_('Name')}</TableHead>
                  <TableHead width="75%">{_('Value')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportformat.params.map(param =>
                  <Param key={param.name}
                    value={param}
                    data={preferences}
                    onChange={this.handlePrefChange}
                  />)}
              </TableBody>
            </Table>
          }
        </Layout>
      );
    }

    return (
      <Layout flex="column">
        <FormGroup title={_('Import XML Report Format')}>
          <FileField
            name="xml_file"
            onChange={onValueChange}/>
        </FormGroup>
      </Layout>
    );
  }
}

Dialog.propTypes = {
  active: PropTypes.yesno,
  name: React.PropTypes.string,
  preferences: React.PropTypes.object,
  reportformat: PropTypes.model,
  summary: React.PropTypes.string,
  onValueChange: React.PropTypes.func,
};

export default withDialog(Dialog, {
  title: _('New Report Format'),
  footer: _('Save'),
  defaultState: {
  },
});

// vim: set ts=2 sw=2 tw=80: