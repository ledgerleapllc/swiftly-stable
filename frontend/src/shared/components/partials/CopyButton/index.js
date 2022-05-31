import { ReactComponent as Check } from 'assets/icons/check.svg';
import { ReactComponent as Copy } from 'assets/icons/copy.svg';
import { useEffect, useRef, useState } from 'react';

export const CopyButton = ({ from }) => {
  const copiedRef = useRef();
  const [copied, setCopied] = useState();

  const copyClipboard = () => {
    if (copied) return;
    const copyText = document.getElementById(from);
    if (copyText) {
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
      navigator.clipboard.writeText(copyText.value);
      setCopied(true);
      copiedRef.current = setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(copiedRef.current);
    };
  }, []);

  return (
    <button className='w-8 h-8 flex justify-center items-center' onClick={copyClipboard}>
      {!copied ? <Copy /> : <Check />}
    </button>
  );
};
