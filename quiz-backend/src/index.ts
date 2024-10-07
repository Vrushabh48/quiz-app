import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { adminRouter } from './routes/admin';

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    userId: string
  }
}>();

app.route('/api/user', userRouter);
app.route('/api/admin', adminRouter);

export default app
