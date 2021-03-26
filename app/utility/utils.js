const getRecordId = (id, attribute, arr) => {
  let response = null;

  arr.map((a) => {
    if (a[attribute] === id) response = a.id;
  });

  return response;
};

export { getRecordId };
