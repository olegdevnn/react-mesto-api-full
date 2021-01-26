const HOME_LINK = '/';
const SING_IN_LINK = '/singin';
const SING_UP_LINK = '/singup';

const consoleDebug = (message) => {
  try {
    console.log(message);
  } catch (err) {
    console.log(err);
  }
};

const safeData = (data) => data.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

export {
  HOME_LINK,
  SING_IN_LINK,
  SING_UP_LINK,
  consoleDebug,
  safeData,
};
