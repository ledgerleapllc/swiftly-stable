import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import { Table, useTable } from 'shared/components/partials/Table';
import { getApplications } from 'stores/api/admin/actions';
import styles from './style.module.scss';

const UsersTable = React.forwardRef(({ externalParams }, ref) => {
  const api = (params, resolve, reject) => {
    dispatch(getApplications(params, resolve, reject));
  };
  const { appendDialog } = useDialog();
  const { data, fetchApi, register, hasMore, handleSort, setData } = useTable({ externalParams, api });

  const dispatch = useDispatch();

  return (
    <Table {...register} styles={styles} onLoadMore={fetchApi} hasMore={hasMore} dataLength={1} onSort={handleSort}>
      <Table.Header>
        <Table.HeaderCell sortKey='created_at'>User ID</Table.HeaderCell>
        <Table.HeaderCell sortKey='email'>User Since</Table.HeaderCell>
        <Table.HeaderCell sortKey='company'>Email</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Company</Table.HeaderCell>
        <Table.HeaderCell>Country/Region</Table.HeaderCell>
        <Table.HeaderCell>KYC/AML</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Header>
      <Table.Body className='table-body-card'>
        {Array.from({ length: 10 }).map((data, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell>1</Table.BodyCell>
            <Table.BodyCell>2022-03-31 09:37:53</Table.BodyCell>
            <Table.BodyCell>email@gmail.com</Table.BodyCell>
            <Table.BodyCell>John Anderson</Table.BodyCell>
            <Table.BodyCell>Best Business LLC.</Table.BodyCell>
            <Table.BodyCell>United States</Table.BodyCell>
            <Table.BodyCell className='text-success'>Verified</Table.BodyCell>
            <Table.BodyCell className='flex gap-x-2'>
              <Button size='sm' as={Link} to='/app/users/1'>
                Detail
              </Button>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default UsersTable;
