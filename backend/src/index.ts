import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

//user routes
app.post('/api/user/signup', (c) => {
  return c.text('Signup route');
})

app.post('/api/user/signin', (c) => {
  return c.text('Signin route');
})

app.post('/api/user/quiz/:id', (c) => {
  return c.text('Attempting test route');
})

app.get('/api/user/quizes', (c) => {
  return c.text('Live Quizes route');
})

app.post('/api/user/submit', (c) => {
  return c.text('Submit route');
})

app.get('/api/user/results', (c) => {
  return c.text('Result route')
})

app.get('/api/user/quiz/:id', (c) => {
  return c.text('Fetch quiz details route');
});

app.get('/api/user/quiz/:id/leaderboard', (c) => {
  return c.text('Fetch leaderboard route');
});

//admin routes
app.post('/api/admin/signup', (c) => {
  return c.text('Admin Signup route');
})

app.post('/api/admin/signin', (c) => {
  return c.text('Admin Signin route');
})

app.post ('/api/admin/create', (c) => {
  return c.text('Create Quiz route');
})

app.delete('/api/admin/delete', (c) => {
  return c.text('delete Quiz route');
});

app.get('/api/admin/dashboard', (c) => {
  return c.text('Admin Dashboard route');
})

app.put('/api/admin/quiz/:id', (c) => {
  return c.text('Update quiz route');
});

app.get('/api/admin/quizzes', (c) => {
  return c.text('Fetch all quizzes route');
});

app.get('/api/admin/quiz/:id/results', (c) => {
  return c.text('Fetch quiz results route');
});

app.put('/api/admin/quiz/:id/end', (c) => {
  return c.text('End quiz route');
});


export default app
