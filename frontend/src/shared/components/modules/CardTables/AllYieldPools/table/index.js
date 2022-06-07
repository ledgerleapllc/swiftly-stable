import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import APICallsDetailModal from 'shared/components/modules/Modals/APICallsDetail';
import { Button } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import { Table, useTable } from 'shared/components/partials/Table';
import { getHistories } from 'stores/api/admin/actions';
import styles from './style.module.scss';

const AllYieldPoolsTable = React.forwardRef(({ externalParams }, ref) => {
  const dispatch = useDispatch();
  const { appendDialog } = useDialog();

  const api = (params, resolve, reject) => {
    dispatch(getHistories(params, resolve, reject));
  };

  const { data, fetchApi, register, hasMore, handleSort } = useTable({ externalParams, api });

  const handleViewAPIDetail = (data) => {
    appendDialog(<APICallsDetailModal data={data} />);
  };

  return (
    <Table {...register} styles={styles} onLoadMore={fetchApi} hasMore={hasMore} dataLength={1} onSort={handleSort}>
      <Table.Header>
        <Table.HeaderCell sortKey='id'>Pool Number</Table.HeaderCell>
        <Table.HeaderCell sortKey='created_at'>Open/Closed</Table.HeaderCell>
        <Table.HeaderCell sortKey='amount'>Created Date</Table.HeaderCell>
        <Table.HeaderCell>Annualized Yield</Table.HeaderCell>
        <Table.HeaderCell>Lockup Period</Table.HeaderCell>
        <Table.HeaderCell>Minimum Stake</Table.HeaderCell>
        <Table.HeaderCell># of Users</Table.HeaderCell>
        <Table.HeaderCell>Total Pool Amount</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Header>
      <Table.Body className='table-body-card'>
        {Array.from({ length: 10 }).map((item, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell>P1</Table.BodyCell>
            <Table.BodyCell>
              <div className='bg-danger rounded-full p-1 w-1 h-1'></div>
            </Table.BodyCell>
            <Table.BodyCell>2022-03-31 09:37:53</Table.BodyCell>
            <Table.BodyCell>5%</Table.BodyCell>
            <Table.BodyCell>90 Days</Table.BodyCell>
            <Table.BodyCell>5,000</Table.BodyCell>
            <Table.BodyCell>651</Table.BodyCell>
            <Table.BodyCell>138,154,147</Table.BodyCell>
            <Table.BodyCell>
              <Button size='sm' as={Link} to='/app/yield-pools/1'>
                Manage Pool
              </Button>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default AllYieldPoolsTable;
