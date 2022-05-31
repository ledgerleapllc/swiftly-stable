import React from 'react';

const CheckBox = React.forwardRef(({ ...otherProps }, ref) => {
  return (
    <div className='flex items-center'>
      <input ref={ref} {...otherProps} type='checkbox' className='w-4 h-4 rounded' />
    </div>
  );
});

CheckBox.propTypes = {};

export default CheckBox;
