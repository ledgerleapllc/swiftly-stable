import classNames from "classnames";

export const HistoryStatus = ({ data }) => {
  const { success, fulfilled } = data;
  
  // Fulfilled = 0 means order placed, pending. “Pending” (regular color)
  // Fulfilled = 1 & success = 0 means order transfer has been sent. “Sent” (blue)
  // Fulfilled = 1 & success = 1 means order is complete. “Confirmed” (green)
  // Fulfilled = 2 means order is failed. “Failed” (red)
  // others Cancelled
  const renderText = () => {
    if (+fulfilled === 0) {
      return <p style={{ fontSize: 'inherit' }}>Pending</p>;
    }
    if (+fulfilled === 1 && +success === 0) {
      return <p className='text-blue' style={{ fontSize: 'inherit' }}>Sent</p>;
    }
    if (+fulfilled === 1 && +success === 1) {
      return <p className='text-success' style={{ fontSize: 'inherit' }}>Confirmed</p>;
    }
    if (+fulfilled === 2) {
      return <p className='text-primary' style={{ fontSize: 'inherit' }}>Failed</p>;
    }
    return <p className='text-primary' style={{ fontSize: 'inherit' }}>Cancelled</p>;
  }

  return (
    <>{renderText()}</>
  )
};

export const IPAddress = ({ data }) => {
  if (!data) return null;
  return (
    <>
      <div className='flex space-x-1'>
        <div className={classNames(+data.return_code === 200? 'text-success' : 'text-primary')}>{data.return_code}</div>
        <div>-</div>
        <div>IP {data.ip}</div>
      </div>
    </>
  )
};

export const DeployHash = ({ data }) => {
  return (
    <a target="_blank" href={`https://cspr.live/deploy/${data.deploy_hash}`} className='text-primary font-size-inherit' rel="noreferrer">{data.deploy_hash}</a>
  );
};

export const Recipient = ({ data }) => {
  return (
    <a target="_blank" href={`https://cspr.live/account/${data.address}`} className='text-primary font-size-inherit' rel="noreferrer">{data.address}</a>
  );
};
