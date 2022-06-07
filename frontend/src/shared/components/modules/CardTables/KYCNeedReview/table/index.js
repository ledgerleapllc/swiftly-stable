import React from 'react';
import { useDispatch } from 'react-redux';
import APICallsDetailModal from 'shared/components/modules/Modals/APICallsDetail';
import { Button } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import { Table, useTable } from 'shared/components/partials/Table';
import { DeployHash, HistoryStatus, IPAddress, Recipient } from 'shared/core/directive';
import { getHistories } from 'stores/api/admin/actions';
import styles from './style.module.scss';

const KYCNeedReviewTable = React.forwardRef(({ externalParams }, ref) => {
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
        <Table.HeaderCell sortKey='id'>Verification Date</Table.HeaderCell>
        <Table.HeaderCell sortKey='created_at'>Name</Table.HeaderCell>
        <Table.HeaderCell sortKey='amount'>Email</Table.HeaderCell>
        <Table.HeaderCell>Shufti RefID</Table.HeaderCell>
        <Table.HeaderCell>Verification Type</Table.HeaderCell>
      </Table.Header>
      <Table.Body className='table-body-card'>
        {Array.from({ length: 10 }).map((item, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell>2022-03-31 09:37:53</Table.BodyCell>
            <Table.BodyCell>John Anderson</Table.BodyCell>
            <Table.BodyCell>email@gmail.com</Table.BodyCell>
            <Table.BodyCell>SP_015-321684816</Table.BodyCell>
            <Table.BodyCell>Individual</Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default KYCNeedReviewTable;
