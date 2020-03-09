const fs = require('fs');
const app = require('express')();
const md5 = require('md5');

app.post('/user/login', (req, res) => {
  let dataIndex = null;
  const rawData = fs.readFileSync('./api/db/users.json');
  const data = JSON.parse(rawData);
  const currentUser = data.find((user, index) => {
    dataIndex = index;
    return user.username === req.body.username;
  });
  if (currentUser.password === req.body.password) {
    currentUser.accessToken = md5(currentUser.username + new Date().toUTCString);
    const response = {};
    response.username = currentUser.username;
    response.token = currentUser.accessToken;
    req.session.currentUser = { username: currentUser.username, accessToken: currentUser.accessToken };
    data[dataIndex] = currentUser;
    fs.writeFileSync('./api/db/users.json', JSON.stringify(data));
    return res.json(response);
  } else {
    return res.status(400).send('Wrong username or password');
  }
});

app.post('/user/logout', (req, res) => {
  delete req.session.currentUser;
  res.sendStatus(200);
});

app.post('/user/new', (req, res) => {
  const rawData = fs.readFileSync('./api/db/users.json');
  const data = JSON.parse(rawData);
  if (req.body.username.length < 3 && req.body.password.length < 4) {
    return res.status(400).send('An error occured');
  }
  if (data.find(user => user.username === req.body.username)) {
    return res.status(409).send('User with this username already exists');
  }
  data.push({
    username: req.body.username,
    password: req.body.password
  });
  fs.writeFileSync('./api/db/users.json', JSON.stringify(data));
  return res.status(200).send('OK');
});

app.get('/posts', (req, res) => {
  const rawData = fs.readFileSync('./api/db/posts.json');
  const data = JSON.parse(rawData);
  return res.json(data);
});

app.get('/posts/:id', (req, res) => {
  const rawData = fs.readFileSync('./api/db/posts.json');
  const postsData = JSON.parse(rawData);
  const data = postsData.find(post => post.id === parseInt(req.params.id));
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.sendStatus(404);
  }
});

app.get('/comments', (req, res) => {
  const rawData = fs.readFileSync('./api/db/comments.json');
  const commentsData = JSON.parse(rawData);
  if (req.query.postId) {
    const data = commentsData.filter(comment => comment.postId === parseInt(req.query.postId));
    if (data.length === 0) {
      return res.sendStatus(404);
    } else {
      return res.status(200).json(data);
    }
  } else {
    return res.status(200).json(commentsData);
  }
});

app.post('/comments', (req, res) => {
  const usersRawData = fs.readFileSync('./api/db/users.json');
  const usersData = JSON.parse(usersRawData);
  const userData = usersData.find(user => user.username === req.body.username);
  if (!req.body.username && !userData) {
    return res.sendStatus(403);
  }
  if (req.body.text.length === 0) {
    return res.status(400).send('Comment text must not be empty');
  }
  const rawData = fs.readFileSync('./api/db/comments.json');
  const data = JSON.parse(rawData);
  data.push({
    id: data.length + 1,
    postId: req.body.postId,
    username: req.body.username,
    datetime: new Date(),
    text: req.body.text
  });
  fs.writeFileSync('./api/db/comments.json', JSON.stringify(data));
  return res.status(200).send('OK');
});

export default {
  path: '/api',
  handler: app
};
