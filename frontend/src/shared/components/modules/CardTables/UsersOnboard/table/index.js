import React from 'react';
import { useDispatch } from 'react-redux';
import ApproveModal from 'shared/components/modules/Modals/ApproveApplication';
import DenyModal from 'shared/components/modules/Modals/DenyApplication';
import ViewModal from 'shared/components/modules/Modals/ViewApplication';
import { Button } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import { Table, useTable } from 'shared/components/partials/Table';
import { getApplications } from 'stores/api/admin/actions';
import styles from './style.module.scss';

const UsersOnboardTable = React.forwardRef(({ externalParams }, ref) => {
  const api = (params, resolve, reject) => {
    dispatch(getApplications(params, resolve, reject));
  };
  const { appendDialog } = useDialog();
  const { data, fetchApi, register, hasMore, handleSort, setData } = useTable({ externalParams, api });

  const dispatch = useDispatch();

  const handleRemove = (guid) => {
    const applicationIdx = data.findIndex((application) => application.guid === guid);
    if (applicationIdx !== -1) {
      data.splice(applicationIdx, 1);
      setData([...data]);
    }
  };

  const handleShowModal = (name, application) => {
    switch (name) {
      case 'approve':
        appendDialog(<ApproveModal application={application} onApprove={handleRemove} />);
        break;
      case 'deny':
        appendDialog(<DenyModal application={application} onDeny={handleRemove} />);
        break;
      default:
        appendDialog(<ViewModal application={application} />);
        break;
    }
  };

  return (
    <Table {...register} styles={styles} onLoadMore={fetchApi} hasMore={hasMore} dataLength={1} onSort={handleSort}>
      <Table.Header>
        <Table.HeaderCell sortKey='created_at'>Registration Date</Table.HeaderCell>
        <Table.HeaderCell sortKey='email'>Email</Table.HeaderCell>
        <Table.HeaderCell sortKey='company'>User Type</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Header>
      <Table.Body className='table-body-card'>
        {Array.from({ length: 10 }).map((data, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell>2022-03-31 09:37:53</Table.BodyCell>
            <Table.BodyCell>email@gmail.com</Table.BodyCell>
            <Table.BodyCell>Individual</Table.BodyCell>
            <Table.BodyCell>John Anderson</Table.BodyCell>
            <Table.BodyCell className='flex gap-x-2'>
              <Button size='sm' color='success' onClick={() => handleShowModal('approve', data)}>
                Approve
              </Button>
              <Button size='sm' onClick={() => handleShowModal('archive', data)}>
                Archive
              </Button>
              <Button size='sm' color='danger' onClick={() => handleShowModal('archive', data)}>
                Delete
              </Button>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default UsersOnboardTable;
