import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { adminRouter } from './routes/admin';

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables : {
    userId : string
  }
}>();

app.route('/api/user', userRouter);
app.route('/api/admin', adminRouter);

//middleware
// app.use(async (c,next) => {
//   const jwt = c.req.header('Authorization');
//   if(!jwt){
//     c.status(401);
//     return c.json({error: "Unauthorized"});
//   }
//   const token = jwt.split(' ')[1];
//   const payload = await verify(token, c.env.JWT_SECRET);
//   if(!payload){
//     c.status(401);
//     return c.json({error : "Unauthorized"});
//   }
//   c.set('userId', String(payload.id))
//   await next();
// })

export default app
