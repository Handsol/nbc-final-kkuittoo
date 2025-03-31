export const fetchSample = async () => {
  const res = await fetch('http://sample.com/sample');
  return res.json;
};

export const addNewSample = async (newData: any) => {
  const res = await fetch('http://sample.com/sample', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  });

  return res.json;
};
