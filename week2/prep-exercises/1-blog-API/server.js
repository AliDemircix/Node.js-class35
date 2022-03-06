const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

app.use(express.json());

// Make Post Request to add Post
app.post('/blogs', (req, res) => {
  // How to get the title and content from the request??
  const title = req.body.title;
  const content = req.body.content;
  fs.writeFileSync(title, content);
  res.end('ok');
});

// Make Put request to update post
app.put('/blogs/:title', (req, res) => {
  // How to get the title and content from the request?
  const title = req.params.title;
  const content = req.body.content;

  // What if the request does not have a title and/or content?
  if (title) {
    fs.writeFileSync(title, content);
    res.end('ok');
  } else {
    res.status(400).json({ msg: 'No title found' });
  }
});

// DELETE Data
app.delete('/blogs/:title', (req, res) => {
  // How to get the title from the url parameters?
  const title = req.params.title;
  if (title) {
    // Add condition here
    fs.unlinkSync(title);
    res.end('ok');
  } else {
    // Respond with message here
    res.status(400).json({ msg: 'No title found for delete' });
  }
});

// GET BLOG WITH A TITLE
app.get('/blogs/:title', (req, res) => {
  // How to get the title from the url parameters?
  const title = req.params.title;
  // check if post exists
  if (title) {
    const post = fs.readFileSync(title);
    console.log(post);
    res.status(200).json({ content: post.toString('utf8') });
  } else {
    res.status(400).json({ msg: 'No post found' });
  }
});

// GET ALL POSTS
app.get('/blogs', (req, res) => {
  const directoryPath = path.join(__dirname);
  let posts = [];
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach((file) => {
      if (path.extname(file) === '' && file !== 'node_modules') {
        const post = fs.readFileSync(file);
        const addedPost = { title: file, post: post.toString('utf8') };
        posts.push(addedPost);
      }
    });

    console.log(posts);
    res.status(200).json(posts);
  });
});

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(3000, () => console.log('Server Started with 3000 port'));
