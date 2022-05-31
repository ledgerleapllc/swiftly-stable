import React, { useState } from 'react';
import Breadcrumb from 'shared/components/modules/Breadcrumb';
import './style.module.scss';

const withPageSetting = (Component) => {
  return (props) => {
    const [breadcrumbData, setBreadcrumb] = useState([]);
    
    return (
      <>
        {!!breadcrumbData.length && (  
          <div className='section-header bg-gray1 px-5 py-3'>
            <Breadcrumb data={breadcrumbData} />
          </div>
        )}
        <Component {...props} config={{ setBreadcrumb }} />
      </>
    );
  };
};

export default withPageSetting;
