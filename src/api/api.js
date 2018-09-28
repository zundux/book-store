import "cross-fetch";
// import GOOGLE_API_KEY from '../../../config'

export const fetchingDefaultParams = {
  // key: GOOGLE_API_KEY || 'YOUR_GOOGLE_API_KEY'
};

export function APIRequest(who) {
  if (who === "google") {
    return fetch("https://google.com")
      .then(res => res.json())
      .catch(error => console.log(error));
  } else {
    return { message: "not allowed argument value provided" };
  }
}