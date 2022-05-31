import React, { useImperativeHandle } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'shared/components/partials';
import { Table, useTable } from 'shared/components/partials/Table';
import { disableIP, enableIP, getIps } from 'stores/api/admin/actions';
import styles from './style.module.scss';

const WhiteListedIPTable = React.forwardRef(({ externalParams }, ref) => {
  const dispatch = useDispatch();

  const api = (params, resolve, reject) => {
    dispatch(getIps(params, resolve, reject));
  };

  const { data, fetchApi, refresh, register, hasMore, handleSort, setData } = useTable({ externalParams, api });

  useImperativeHandle(ref, () => ({
    refresh,
  }));

  const handleIPStatus = (idx, status, ip, id) => {
    status === '1'
      ? dispatch(
          disableIP({ ip_id: id, ip }, () => {
            data[idx].active = '0';
            setData([...data]);
          })
        )
      : dispatch(
          enableIP({ ip_id: id, ip }, () => {
            data[idx].active = '1';
            setData([...data]);
          })
        );
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
        <Table.HeaderCell>User IP</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Date Added</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Header>
      <Table.Body className='table-body-card'>
        {data.map((data, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell>{data.ip}</Table.BodyCell>
            <Table.BodyCell className={data.active !== '1' && 'text-primary'}>
              {data.active === '1' ? 'Allowed' : 'Disabled'}
            </Table.BodyCell>
            <Table.BodyCell>{data.created_at}</Table.BodyCell>
            <Table.BodyCell className='flex gap-x-2'>
              <Button
                size='sm'
                variant={data.active === '1' ? 'contained' : 'outline'}
                rounded
                onClick={() => handleIPStatus(idx, data.active, data.ip, data.id)}
              >
                {data.active === '1' ? 'Disable' : 'Allow'}
              </Button>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default WhiteListedIPTable;
