import React from 'react';
import { useDispatch } from 'react-redux';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import { Table, useTable } from 'shared/components/partials/Table';
import { getApplications } from 'stores/api/admin/actions';
import styles from './style.module.scss';

const YieldPoolsTable = React.forwardRef(({ externalParams }, ref) => {
  const api = (params, resolve, reject) => {
    dispatch(getApplications(params, resolve, reject));
  };
  const { appendDialog } = useDialog();
  const { data, fetchApi, register, hasMore, handleSort, setData } = useTable({ externalParams, api });

  const dispatch = useDispatch();

  return (
    <Table
      className='min-w-0'
      {...register}
      styles={styles}
      onLoadMore={fetchApi}
      hasMore={hasMore}
      dataLength={1}
      onSort={handleSort}
    >
      <Table.Header>
        <Table.HeaderCell sortKey='created_at'>Pool Number</Table.HeaderCell>
        <Table.HeaderCell sortKey='email'>Latest Stake</Table.HeaderCell>
        <Table.HeaderCell sortKey='company'>Total Stake</Table.HeaderCell>
        <Table.HeaderCell>Annualized Yield</Table.HeaderCell>
        <Table.HeaderCell>Earnings</Table.HeaderCell>
      </Table.Header>
      <Table.Body className='table-body-card'>
        {Array.from({ length: 3 }).map((data, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell>P201</Table.BodyCell>
            <Table.BodyCell>2022-03-31 09:37:53</Table.BodyCell>
            <Table.BodyCell>50,000</Table.BodyCell>
            <Table.BodyCell>4%</Table.BodyCell>
            <Table.BodyCell>2000</Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default YieldPoolsTable;
