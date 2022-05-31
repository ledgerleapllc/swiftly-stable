import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { STATUS } from 'shared/common/enum';
import { Table, useTable } from 'shared/components/partials/Table';
import { getUserApiKeys } from 'stores/api/user/actions';
import styles from './style.module.scss';

const MyApiKeysTable = React.forwardRef(({ externalParams }, ref) => {
  const dispatch = useDispatch();

  const api = (params, resolve, reject) => {
    dispatch(getUserApiKeys(params, resolve, reject));
  };

  const { data, fetchApi, register, hasMore, handleSort } = useTable({ externalParams, api });

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
        <Table.HeaderCell>API Keys</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Activation Date</Table.HeaderCell>
        <Table.HeaderCell>Total API Calls</Table.HeaderCell>
        <Table.HeaderCell>Total CSPR Sent</Table.HeaderCell>
      </Table.Header>
      <Table.Body className='table-body-card'>
        {data.map((data, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell className={classNames({ 'text-primary': data.active === STATUS.INACTIVE })}>
              {data.api_key}
            </Table.BodyCell>
            <Table.BodyCell className={classNames({ 'text-primary': data.active === STATUS.INACTIVE })}>
              {data.active === STATUS.ACTIVE ? 'Active' : 'Inactive'}
            </Table.BodyCell>
            <Table.BodyCell>{data.created_at}</Table.BodyCell>
            <Table.BodyCell>{data.total_calls}</Table.BodyCell>
            <Table.BodyCell>{data.total_cspr_sent}</Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default MyApiKeysTable;
