import axios from 'axios';

export async function getArticles(url: string, token?: string | null) {
  if (token) {
    const options = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const { data } = await axios.get(url, { headers: options.headers });
    return data;
  }
  const { data } = await axios.get(url);
  return data;
}

export async function getUser(url: string, token: string | undefined) {
  const options = {
    headers: {
      Authorization: `Token ${token}`,
    },
    body: null,
  };
  const { data } = await axios.get(url, { headers: options.headers });
  return data;
}

export async function postResources(url: string, object?: object, token?: string | null) {
  if (token && !object) {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    };
    const { data } = await axios.post(url, { headers: options.headers });
    return data;
  }

  if (token && object) {
    const options = {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(object),
    };
    const { data } = await axios.post(url, options.body, { headers: options.headers });
    return data;
  }

  const { data } = await axios.post(url, object);

  return data;
}

export async function putResources(url: string, user?: object, token?: string) {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  };
  const { data } = await axios.put(url, user, options);

  return data;
}

export async function addFavoriteArticle(url: string, token: string | null) {
  const options = {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  };
  try {
    const { data } = await axios.post(url, {}, options);
    return data;
  } catch (err) {
    throw new Error(`Could not fetch, received ${err}`);
  }
}

export async function deleteFavoriteArticle(url: string, token: string | null) {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
  };
  try {
    await fetch(url, options);
  } catch (err) {
    throw new Error(`Could not fetch, received ${err}`);
  }
}

export async function deleteArticle(url: string, token: string | null) {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
  };
  try {
    await fetch(url, options);
  } catch (err) {
    throw new Error(`Could not fetch, received ${err}`);
  }
}

export async function editArticle(url: string, token: string | null, data: object) {
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);
  const json = await response.json();
  return json;
}
