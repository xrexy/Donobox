import React from 'react';
import { useLocation } from 'react-router-dom';

export const capitalize = (msg: string) =>
  msg.toString().charAt(0).toUpperCase() + msg.toString().slice(1);

export const errorTimeout = 5 * 1000;

export const handleApi400Error = (
  err: any,
  set: React.Dispatch<React.SetStateAction<string[] | undefined>>
) => {
  let output: string | string[];
  switch (err.response.status) {
    case 400:
      output = err.response.data.message;

      if (typeof output === 'string') {
        set([capitalize(output)]);
      } else {
        set(output.map((errToMap) => capitalize(errToMap)));
      }

      setTimeout(() => set([]), errorTimeout);
      break;
    default:
      set(['Invalid credentials']);
      setTimeout(() => set([]), errorTimeout);
  }
};

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
