import { ReactComponent as Key } from 'assets/icons/key.svg';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardBody, CardHeader, CopyButton } from 'shared/components/partials';
import Progress from 'shared/components/partials/Progress';
import { getGuid } from 'shared/core/services/auth';
import { getUserAPIKey, getUserUsage } from 'stores/api/user/actions';
import styles from './style.module.scss';

const APIKeyUsage = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [apiKey, setApiKey] = useState();

  useEffect(() => {
    fetchUserUsage();
    fetchAPIKey();
  }, []);

  const calcPercent = (top, bot) => {
    if (!top || !bot) return 0;
    return (top / bot) * 100;
  };

  const fetchUserUsage = () => {
    dispatch(
      getUserUsage(null, (res) => {
        setData(res.detail);
      })
    );
  };

  const fetchAPIKey = () => {
    dispatch(
      getUserAPIKey(
        {
          guid: getGuid(),
        },
        (res) => {
          setApiKey((prev) => ({ ...prev, ...res.detail }));
        },
        (err) => {}
      )
    );
  };

  return (
    <Card>
      <CardHeader icon={<Key />} title='API Key Useage'>
        <div className='flex gap-2 items-center'>
          <b className='whitespace-nowrap'>My Key:</b>
          <p>{apiKey?.api_key}</p>
          <input defaultValue={apiKey?.api_key} id='active-api-key-id' readOnly hidden />
          <CopyButton from='active-api-key-id' />
        </div>
      </CardHeader>
      <CardBody noSpacing>
        <div className='flex'>
          <div className={styles.blockItem}>
            <p>Tokens Today</p>
            <Progress percent={calcPercent(data?.usage_today, data?.usage_today_total)} />
            <p>
              {data?.usage_today}/{data?.usage_today_total}
            </p>
          </div>
          <div className={styles.blockItem}>
            <p>Tokens Yesterday</p>
            <Progress percent={calcPercent(data?.usage_yesterday, data?.usage_yesterday_total)} />
            <p>
              {data?.usage_yesterday}/{data?.usage_yesterday_total}
            </p>
          </div>
          <div className={styles.blockItem}>
            <p>Tokens This Month</p>
            <Progress percent={calcPercent(data?.usage_thismonth, data?.usage_thismonth_total)} />
            <p>
              {data?.usage_thismonth}/{data?.usage_thismonth_total}
            </p>
          </div>
          <div className={styles.blockItem}>
            <p>Tokens Last Month</p>
            <Progress percent={calcPercent(data?.usage_lastmonth, data?.usage_lastmonth_total)} />
            <p>
              {data?.usage_lastmonth}/{data?.usage_lastmonth_total}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

APIKeyUsage.propTypes = {};

export default APIKeyUsage;
