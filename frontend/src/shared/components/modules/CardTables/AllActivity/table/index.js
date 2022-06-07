import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Table, useTable } from 'shared/components/partials/Table';
import { getUserApiKeys } from 'stores/api/user/actions';
import styles from './style.module.scss';

const AllActivityTable = React.forwardRef(({ externalParams }, ref) => {
  const dispatch = useDispatch();

  const api = (params, resolve, reject) => {
    dispatch(getUserApiKeys(params, resolve, reject));
  };

  const { data, fetchApi, register, hasMore, handleSort } = useTable({ externalParams, api });

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
        <Table.HeaderCell>Time Stamp</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Amount</Table.HeaderCell>
        <Table.HeaderCell>Total balance</Table.HeaderCell>
        <Table.HeaderCell>Other Notes</Table.HeaderCell>
      </Table.Header>
      <Table.Body className='table-body-card'>
        {Array.from({ length: 10 }).map((data, idx) => (
          <Table.BodyRow className='py-4'>
            <Table.BodyCell>2022-03-31 09:37:53</Table.BodyCell>
            <Table.BodyCell>Stablecoin Purchase</Table.BodyCell>
            <Table.BodyCell className={classNames({ 'text-primary': true })}>Active</Table.BodyCell>
            <Table.BodyCell>5,000</Table.BodyCell>
            <Table.BodyCell>26,000</Table.BodyCell>
            <Table.BodyCell>Payment Type: Wire</Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default AllActivityTable;
