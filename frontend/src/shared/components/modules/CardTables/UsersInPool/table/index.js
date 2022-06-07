import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import { Table, useTable } from 'shared/components/partials/Table';
import { getApplications } from 'stores/api/admin/actions';
import styles from './style.module.scss';

const UsersInPoolTable = React.forwardRef(({ externalParams }, ref) => {
  const api = (params, resolve, reject) => {
    dispatch(getApplications(params, resolve, reject));
  };
  const { appendDialog } = useDialog();
  const { data, fetchApi, register, hasMore, handleSort, setData } = useTable({ externalParams, api });

  const dispatch = useDispatch();

  return (
    <Table {...register} styles={styles} onLoadMore={fetchApi} hasMore={hasMore} dataLength={1} onSort={handleSort}>
      <Table.Header>
        <Table.HeaderCell sortKey='created_at'>User</Table.HeaderCell>
        <Table.HeaderCell sortKey='email'>Total Staked</Table.HeaderCell>
        <Table.HeaderCell sortKey='company'>Latest Stake</Table.HeaderCell>
      </Table.Header>
      <Table.Body className='table-body-card'>
        {Array.from({ length: 10 }).map((data, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell>email@gmail.com</Table.BodyCell>
            <Table.BodyCell>50,000</Table.BodyCell>
            <Table.BodyCell>2022-03-31 09:37:53</Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default UsersInPoolTable;
