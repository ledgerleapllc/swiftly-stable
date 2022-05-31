import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { STATUS } from 'shared/common/enum';
import { Button } from 'shared/components/partials';
import { Table, useTable } from 'shared/components/partials/Table';
import { getAPIKeyHolders } from 'stores/api/admin/actions';
import styles from './style.module.scss';

const ApiKeysTable = React.forwardRef(({ externalParams }, ref) => {
  const api = (params, resolve, reject) => {
    dispatch(getAPIKeyHolders(params, resolve, reject));
  };

  const { data, fetchApi, register, hasMore, handleSort } = useTable({ externalParams, api, defaultSort: {key: 'created_at', direction: 'desc'} });

  const dispatch = useDispatch();

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
        <Table.HeaderCell sortKey='userId'>User ID</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Activation Date</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Company</Table.HeaderCell>
        <Table.HeaderCell>Total API Calls</Table.HeaderCell>
        <Table.HeaderCell>Total CSPR Sent</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Header>
      <Table.Body className='table-body-card'>
        {data.map((data, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell>{data.guid}</Table.BodyCell>
            <Table.BodyCell className={classNames({ 'text-primary': data.account_active === STATUS.INACTIVE })}>
              {data.account_active === STATUS.ACTIVE ? 'Active' : 'Inactive'}
            </Table.BodyCell>
            <Table.BodyCell>{data.created_at}</Table.BodyCell>
            <Table.BodyCell>{data.email}</Table.BodyCell>
            <Table.BodyCell>{data.company}</Table.BodyCell>
            <Table.BodyCell>{data.total_calls}</Table.BodyCell>
            <Table.BodyCell>{data.total_cspr_sent}</Table.BodyCell>
            <Table.BodyCell className='flex gap-x-2'>
              <Button as={Link} to={`/app/api-keys/${data.guid}`} size='sm' rounded>
                Details
              </Button>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default ApiKeysTable;
