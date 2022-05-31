import classNames from 'classnames';
import React, { useImperativeHandle } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'shared/components/partials';
import { Table, useTable } from 'shared/components/partials/Table';
import { disableUser, enableUser, getAdmins } from 'stores/api/admin/actions';
import styles from './style.module.scss';

const AdminsTable = React.forwardRef(({ externalParams }, ref) => {
  const dispatch = useDispatch();

  const api = (params, resolve, reject) => {
    dispatch(getAdmins(params, resolve, reject));
  };

  const { data, fetchApi, refresh, register, hasMore, handleSort, setData } = useTable({ externalParams, api });
  
  useImperativeHandle(ref, () => ({
    refresh
  }));

  const handleAction = (idx, admin_approved, guid) => {
    if (admin_approved !== '1' && admin_approved !== '2') {
      dispatch(
        enableUser({ guid }, () => {
          data[idx].admin_approved = '1';
          setData([...data]);
        })
      );
    }
    if (admin_approved === '1')
      dispatch(
        disableUser({ guid }, () => {
          data[idx].admin_approved = '3';
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
        <Table.HeaderCell sortKey='email'>Email</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell sortKey='date'>Date Added</Table.HeaderCell>
        <Table.HeaderCell sortKey='ip'>IP</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Header>
      <Table.Body>
        {data.map((data, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell>{data.email}</Table.BodyCell>
            <Table.BodyCell
              className={classNames({ 'text-primary': data.admin_approved !== '1' && data.admin_approved !== '2' })}
            >
              {data.admin_approved === '1' ? 'Active' : data.admin_approved === '2' ? 'Denied' : 'Inactive'}
            </Table.BodyCell>
            <Table.BodyCell>{data.created_at}</Table.BodyCell>
            <Table.BodyCell>{data.last_ip}</Table.BodyCell>
            <Table.BodyCell className='flex gap-x-2'>
              <Button
                size='xs'
                variant={data.admin_approved !== '1' && data.admin_approved !== '2' ? 'outline' : 'contained'}
                className='rounded-full'
                onClick={() => handleAction(idx, data.admin_approved, data.guid)}
              >
                {data.admin_approved === '1' ? 'Disable' : 'Re-active'}
              </Button>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default AdminsTable;
