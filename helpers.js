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
    return { chosen: 'integrated' };
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

export const calTime = (ms) => {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const daysms = ms % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysms / (60 * 60 * 1000));
  const hoursms = ms % (60 * 60 * 1000);
  const minutes = Math.floor(hoursms / (60 * 1000));
  const minutesms = ms % (60 * 1000);
  const seconds = Math.floor(minutesms / 1000);
  return { days, hours, minutes, seconds };
};

export const fixLocaleTime = (date) => {
  return new Date(
    date.getTime() + date.getTimezoneOffset() * 60000
  ).toISOString();
};

export const beautifyTime = (time) => {
  if (time) {
    const temp = calTime(Date.now() - new Date(time).getTime());
    if (temp.days > 30) {
      return Math.floor(temp.days / 30) + ' months ago';
    } else if (temp.days > 7) {
      return Math.floor(temp.days / 7) + ' weeks ago';
    } else if (temp.days > 0) {
      return temp.days + ' days ago';
    } else if (temp.hours > 0) {
      return temp.hours + ' hours ago';
    } else if (temp.minutes > 0) {
      return temp.minutes + ' minutes ago';
    } else if (temp.seconds > 0) {
      return temp.seconds + ' seconds ago';
    } else {
      return getFormatDate(new Date(time));
    }
  }
};
