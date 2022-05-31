import React, { useEffect, useState } from 'react';
import { Input } from 'shared/components/partials';
import { useDelayInput } from 'shared/hooks/useDelayInput';

const ENTRIES_PICKER = [10, 20, 30];

const Toolbar = (props) => {
  const [params, setParams] = useState({
    limit: ENTRIES_PICKER[0],
    search: '',
  });
  const { params: paramsInput, setSearchTerm } = useDelayInput();

  useEffect(() => {
    if (props.onChange) props.onChange(params);
  }, [params]);

  const handleChange = (field, value) => {
    const temp = {
      ...params,
      [field]: value,
    };
    setParams(temp);
  };

  useEffect(() => {
    if (paramsInput) {
      handleChange('search', paramsInput.search);
    }
  }, [paramsInput]);

  return (
    <div className='flex justify-between w-full pb-7'>
      <div className='flex items-center gap-x-1'>
        <p className='font-semibold text-[10px]'>Show</p>
        <select
          className='outline outline-1 px-1 font-semibold text-[10px]'
          value={params.limit}
          onChange={(e) => handleChange('limit', +e.target.value)}
        >
          {ENTRIES_PICKER.map((x, id) => (
            <option key={id} value={x}>
              {x}
            </option>
          ))}
        </select>
        <p className='font-semibold text-[10px]'>entries</p>
      </div>
      <div>
        <Input
          className='bg-white w-40 py-0 px-1 text-[10px]'
          placeholder='Search'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Toolbar;
