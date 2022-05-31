import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import { Table, useTable } from 'shared/components/partials/Table';
import { getApplications } from 'stores/api/admin/actions';
import ApproveModal from 'shared/components/modules/Modals/ApproveApplication';
import DenyModal from 'shared/components/modules/Modals/DenyApplication';
import ViewModal from 'shared/components/modules/Modals/ViewApplication';
import styles from './style.module.scss';

const ApplicationsTable = React.forwardRef(({ externalParams }, ref) => {
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
    <Table
      {...register}
      styles={styles}
      onLoadMore={fetchApi}
      hasMore={hasMore}
      dataLength={data.length}
      onSort={handleSort}
    >
      <Table.Header>
        <Table.HeaderCell sortKey='created_at'>Application Date</Table.HeaderCell>
        <Table.HeaderCell sortKey='email'>Email</Table.HeaderCell>
        <Table.HeaderCell sortKey='company'>Company</Table.HeaderCell>
        <Table.HeaderCell>IP</Table.HeaderCell>
        <Table.HeaderCell sortKey='cspr'>Expected Monthly CSPR</Table.HeaderCell>
        <Table.HeaderCell>Reason</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Header>
      <Table.Body className='table-body-card'>
        {data.map((data, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell>{data.created_at}</Table.BodyCell>
            <Table.BodyCell>{data.email}</Table.BodyCell>
            <Table.BodyCell>{data.company}</Table.BodyCell>
            <Table.BodyCell>{data.last_ip}</Table.BodyCell>
            <Table.BodyCell>{data.cspr_expectation}</Table.BodyCell>
            <Table.BodyCell>
              <Button
                size='xs'
                variant='text'
                className='underline decoration-1'
                onClick={() => handleShowModal('view', data)}
              >
                View
              </Button>
            </Table.BodyCell>
            <Table.BodyCell className='flex gap-x-2'>
              <Button size='sm' rounded onClick={() => handleShowModal('approve', data)}>
                Approve
              </Button>
              <Button size='sm' variant='outline' rounded onClick={() => handleShowModal('deny', data)}>
                Deny
              </Button>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default ApplicationsTable;
