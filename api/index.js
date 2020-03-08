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
    res.json(response);
  } else {
    res.status(401).send('Wrong username or password');
  }
});

app.post('/user/logout', (req, res) => {
  delete req.session.currentUser;
  res.sendStatus(200);
});

export default {
  path: '/api',
  handler: app
};
