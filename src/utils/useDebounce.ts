import React from 'react';

const useDebounce = (inputValue: string, time: number = 500) => {
  const [debouncedInputValue, setDebouncedInputValue] = React.useState('');

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, time);
    return () => clearTimeout(timeoutId);
  }, [inputValue, time]);
  return debouncedInputValue;
};

export default useDebounce;
