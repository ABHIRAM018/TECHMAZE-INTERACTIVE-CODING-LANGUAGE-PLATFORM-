import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.post('/api/compile', (req, res) => {
  const { code, language } = req.body;
  // Simulate code compilation and execution
  let output = 'Hello, World!';
  if (language === 'python') {
    output = `Python code executed: ${code}`;
  } else if (language === 'c') {
    output = `C code executed: ${code}`;
  } else if (language === 'cpp') {
    output = `C++ code executed: ${code}`;
  }
  res.json({ output });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});