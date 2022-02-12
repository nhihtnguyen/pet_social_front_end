export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

/* Get prefer wallet for specific param action whether if it's metamask. Return 'metamask', 'integrated', null */
export const getPrimaryWallet = (action) => {
  try {
    let primaryWallet = localStorage.getItem('primary_wallet');
    let selected;
    if (primaryWallet) {
      primaryWallet = JSON.parse(primaryWallet);
    }
    if (window.ethereum) {
      selected = window.ethereum.selectedAddress;
    }
    let actionAddress = String(primaryWallet[action]).toLowerCase() ?? null;
    selected = String(selected).toLowerCase();

    const chosen = Boolean(actionAddress)
      ? selected == actionAddress
        ? 'metamask'
        : 'integrated'
      : null;
    return { chosen, actionAddress };
  } catch (error) {
    console.log(error);
  }
};

export const getFormatDate = (date, format = 'mm/dd/yyyy') => {
  let mm =
    date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  let dd = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
  let yyyy = date.getFullYear();
  let newDate = format;
  newDate = newDate
    .replaceAll('mm', mm)
    .replaceAll('dd', dd)
    .replaceAll('yyyy', yyyy);

  return newDate;
};

export const calVote = (vote) => {
  if (vote >= 1000000) {
    return `${vote / 1000000}m`;
  } else if (vote >= 1000) {
    return `${vote / 1000}k`;
  } else {
    return `${vote}`;
  }
};
