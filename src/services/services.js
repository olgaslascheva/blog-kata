export const loginUser = async (email, password) => {
  const body = {
    user: {
      email: email,
      password: password,
    },
  };
  return await fetch('https://blog.kata.academy/api/users/login', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      if (res.status === 422) throw 422;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      if (error === 422) throw error;
    });
};

export const updateUser = async (username, email, password, imageUrl, token) => {
  const body = {
    user: {
      username: username,
      email: email,
      image: imageUrl,
    },
  };
  if (password) body.user.password = password;
  return await fetch('https://blog.kata.academy/api/user', {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      if (res.status === 422) throw 422;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      if (error === 422) throw error;
    });
};

export const registerUser = async (username, email, password) => {
  const body = {
    user: {
      username: username,
      email: email,
      password: password,
    },
  };
  return await fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      if (res.status === 422) throw 422;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      if (error === 422) throw error;
    });
};

export const createArticle = async (title, description, text, tags, token) => {
  const body = {
    article: {
      title: title,
      description: description,
      body: text,
    },
  };
  if (tags) body.article.tagList = tags;
  return await fetch('https://blog.kata.academy/api/articles', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      if (res.status === 422) throw 422;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      if (error === 422) throw error;
    });
};

export const deleteArticle = async (slug, token) => {
  return await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
};

export const editArticle = async (title, description, text, slug, token) => {
  const body = {
    article: {
      title: title,
      description: description,
      body: text,
    },
  };
  return await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      return data;
    });
};

export const favoriteArticle = async (slug, token) => {
  return await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
};

export const unFavoriteArticle = async (slug, token) => {
  return await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
};
