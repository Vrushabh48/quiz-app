import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";
import { sign,verify } from "hono/jwt";
import { cors } from "hono/cors";

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables : {
    userId : string
  }
}>();


app.use(cors({
  origin: '*', // Allows all origins, you can specify a specific origin if needed
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

//middleware
app.use(async (c,next) => {
  const jwt = c.req.header('Authorization');
  if(!jwt){
    c.status(401);
    return c.json({error: "Unauthorized"});
  }
  const token = jwt.split(' ')[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if(!payload){
    c.status(401);
    return c.json({error : "Unauthorized"});
  }
  c.set('userId', String(payload.id))
  await next();
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

//user routes
app.post('/api/user/signup',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());
const body = await c.req.json();
try {
  const user = await prisma.user.create({
    data: {
      name: body.name,
      username: body.username,
      password: body.password
    }
  })
  const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
    return c.json({jwt});
} catch (error) {
  c.status(403);
  return c.text('Error during Signup');
}
})

app.post('/api/user/signin',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());

const body =await c.req.json();

try {
  const user = await prisma.user.findUnique({
    where: {
      username: body.username,
      password: body.password
    }
  })

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const jwt = await sign({id: user.id},c.env.JWT_SECRET);
  return c.json({jwt});

} catch (error) {
  c.status(403);
  return c.text("Invalid Credentials")
}
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
