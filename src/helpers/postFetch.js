const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function getFetchToken(resource, token) {
  try {
    const resp = await fetch(`${BASE_URL}${resource}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.log('getFetch error', error);
    return false;
  }
}

// export async function dataFetch(resource) {
//   try {
//     const resp = await fetch(`${BASE_URL}/${resource}`);
//     const dataInJs = await resp.json();
//     return dataInJs;
//   } catch (error) {
//     console.log('dataFetch error', error);
//     return false;
//   }
// }

export async function sendFetch(resource, dataToPost) {
  try {
    const resp = await fetch(`${BASE_URL}${resource}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToPost),
    });
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.log('sendFetch', error);
    return false;
  }
}

export async function postFetchToken(resource, dataToPost, token) {
  try {
    const resp = await fetch(`${BASE_URL}${resource}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToPost),
    });
    const dataInJs = await resp.json();
    console.log('successfull post of skill');
    return dataInJs;
  } catch (error) {
    console.log('postFetchToken', error);
    return false;
  }
}
