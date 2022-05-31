import classNames from 'classnames';
import React, { useImperativeHandle } from 'react';
import { useDispatch } from 'react-redux';
import { Table, useTable } from 'shared/components/partials/Table';
import { formatDate } from 'shared/core/utils';
import { getWallets } from 'stores/api/admin/actions';
import styles from './style.module.scss';

const WalletsHistoryTable = React.forwardRef(({ externalParams }, ref) => {
  const dispatch = useDispatch();

  const api = (params, resolve, reject) => {
    dispatch(getWallets(params, resolve, reject));
  };

  const { data, fetchApi, refresh, register, hasMore, handleSort } = useTable({ externalParams, api });

  useImperativeHandle(ref, () => ({
    refresh
  }));

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
        <Table.HeaderCell>User ID</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Created Date</Table.HeaderCell>
        <Table.HeaderCell>Inactive Date</Table.HeaderCell>
        <Table.HeaderCell>Deposit Address</Table.HeaderCell>
        <Table.HeaderCell>Balance</Table.HeaderCell>
      </Table.Header>
      <Table.Body className='table-body-card'>
        {data.map((data, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell>{data.guid}</Table.BodyCell>
            <Table.BodyCell className={classNames(!data.active && 'text-primary')}>
              {+data.active ? 'Active' : 'Old'}
            </Table.BodyCell>
            <Table.BodyCell>{formatDate(data.created_at)}</Table.BodyCell>
            <Table.BodyCell>{formatDate(data.inactive_at)}</Table.BodyCell>
            <Table.BodyCell>{data.address}</Table.BodyCell>
            <Table.BodyCell>{data.balance}</Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default WalletsHistoryTable;
