/* Greenbone Security Assistant
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
 * Steffen Waterkamp <steffen.waterkamp@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2017 - 2018 Greenbone Networks GmbH
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

import _ from 'gmp/locale.js';

import {is_defined} from 'gmp/utils';

import PropTypes from '../../utils/proptypes.js';

import EntityPage from '../../entity/page.js';
import EntityContainer, {
  permissions_subject_loader,
} from '../../entity/container.js';
import {goto_details, goto_list} from '../../entity/component.js';

import ExportIcon from '../../components/icon/exporticon.js';
import CloneIcon from '../../entity/icon/cloneicon.js';
import CreateIcon from '../../entity/icon/createicon.js';
import EditIcon from '../../entity/icon/editicon.js';
import TrashIcon from '../../entity/icon/trashicon.js';

import ManualIcon from '../../components/icon/manualicon.js';
import ListIcon from '../../components/icon/listicon.js';

import Divider from '../../components/layout/divider.js';
import IconDivider from '../../components/layout/icondivider.js';
import Layout from '../../components/layout/layout.js';

import Tab from '../../components/tab/tab.js';
import TabLayout from '../../components/tab/tablayout.js';
import TabList from '../../components/tab/tablist.js';
import TabPanel from '../../components/tab/tabpanel.js';
import TabPanels from '../../components/tab/tabpanels.js';
import Tabs from '../../components/tab/tabs.js';

import GroupComponent from './component.js';
import GroupDetails from './details.js';

const ToolBarIcons = ({
  entity,
  onGroupCloneClick,
  onGroupCreateClick,
  onGroupDeleteClick,
  onGroupDownloadClick,
  onGroupEditClick,
}) => (
  <Divider margin="10px">
    <IconDivider>
      <ManualIcon
        page="gui_administration"
        anchor="groups"
        title={_('Help: Group Details')}
      />
      <ListIcon
        title={_('Groups List')}
        page="groups"
      />
    </IconDivider>
    <IconDivider>
      <CreateIcon
        entity={entity}
        onClick={onGroupCreateClick}
      />
      <CloneIcon
        entity={entity}
        onClick={onGroupCloneClick}
      />
      <EditIcon
        entity={entity}
        onClick={onGroupEditClick}
      />
      <TrashIcon
        entity={entity}
        onClick={onGroupDeleteClick}
      />
      <ExportIcon
        value={entity}
        title={_('Export Group as XML')}
        onClick={onGroupDownloadClick}
      />
    </IconDivider>
  </Divider>
);

ToolBarIcons.propTypes = {
  entity: PropTypes.model.isRequired,
  onGroupCloneClick: PropTypes.func.isRequired,
  onGroupCreateClick: PropTypes.func.isRequired,
  onGroupDeleteClick: PropTypes.func.isRequired,
  onGroupDownloadClick: PropTypes.func.isRequired,
  onGroupEditClick: PropTypes.func.isRequired,
};

const Page = ({
  onChanged,
  onDownloaded,
  onError,
  ...props
}) => (
  <GroupComponent
    onCloned={goto_details('group', props)}
    onCloneError={onError}
    onCreated={goto_details('group', props)}
    onDeleted={goto_list('groups', props)}
    onDeleteError={onError}
    onDownloaded={onDownloaded}
    onDownloadError={onError}
    onSaved={onChanged}
  >
    {({
      clone,
      create,
      delete: delete_func,
      download,
      edit,
      save,
    }) => (
      <EntityPage
        {...props}
        sectionIcon="group.svg"
        title={_('Group')}
        detailsComponent={GroupDetails}
        toolBarIcons={ToolBarIcons}
        onGroupCloneClick={clone}
        onGroupCreateClick={create}
        onGroupDeleteClick={delete_func}
        onGroupDownloadClick={download}
        onGroupEditClick={edit}
        onGroupSaveClick={save}
        onPermissionChanged={onChanged}
        onPermissionDownloaded={onDownloaded}
        onPermissionDownloadError={onError}
      >
        {({
          activeTab = 0,
          permissionsComponent,
          permissionsTitle,
          tagsComponent,
          tagsTitle,
          onActivateTab,
          entity,
          ...other
        }) => {
          return (
            <Layout grow="1" flex="column">
              <TabLayout
                grow="1"
                align={['start', 'end']}
              >
                <TabList
                  active={activeTab}
                  align={['start', 'stretch']}
                  onActivateTab={onActivateTab}
                >
                  <Tab>
                    {_('Information')}
                  </Tab>
                  {is_defined(tagsComponent) &&
                    <Tab>
                      {tagsTitle}
                    </Tab>
                  }
                  {is_defined(permissionsComponent) &&
                    <Tab>
                      {permissionsTitle}
                    </Tab>
                  }
                </TabList>
              </TabLayout>

              <Tabs active={activeTab}>
                <TabPanels>
                  <TabPanel>
                    <GroupDetails
                      entity={entity}
                    />
                  </TabPanel>
                  {is_defined(tagsComponent) &&
                    <TabPanel>
                      {tagsComponent}
                    </TabPanel>
                  }
                  {is_defined(permissionsComponent) &&
                    <TabPanel>
                      {permissionsComponent}
                    </TabPanel>
                  }
                </TabPanels>
              </Tabs>
            </Layout>
          );
        }}
      </EntityPage>
    )}
  </GroupComponent>
);

Page.propTypes = {
  onChanged: PropTypes.func.isRequired,
  onDownloaded: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

const GroupPage = props => (
  <EntityContainer
    {...props}
    name="group"
    loaders={[
      permissions_subject_loader,
    ]}
  >
    {cprops => <Page {...props} {...cprops} />}
  </EntityContainer>
);

export default GroupPage;

// vim: set ts=2 sw=2 tw=80:
