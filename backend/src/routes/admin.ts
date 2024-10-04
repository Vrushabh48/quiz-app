import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { cors } from 'hono/cors';  // Import cors middleware

export const adminRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	}
  Variables : {
		userId: string
	}
}>();

adminRouter.use(cors({
    origin: '*', // Allows all origins, you can specify a specific origin if needed
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  }));



adminRouter.post('/signup', (c) => {
    return c.text('Admin Signup route');
  })
  
  adminRouter.post('/signin', (c) => {
    return c.text('Admin Signin route');
  })
  
  adminRouter.post ('/create', (c) => {
    return c.text('Create Quiz route');
  })
  
  adminRouter.delete('/delete', (c) => {
    return c.text('delete Quiz route');
  });
  
  adminRouter.get('/dashboard', (c) => {
    return c.text('Admin Dashboard route');
  })
  
  adminRouter.put('/quiz/:id', (c) => {
    return c.text('Update quiz route');
  });
  
  adminRouter.get('/quizzes', (c) => {
    return c.text('Fetch all quizzes route');
  });
  
  adminRouter.get('/quiz/:id/results', (c) => {
    return c.text('Fetch quiz results route');
  });
  
  adminRouter.put('/quiz/:id/end', (c) => {
    return c.text('End quiz route');
  });
  