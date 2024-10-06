import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { cors } from "hono/cors";
import { auth } from 'hono/utils/basic-auth';
import {usersignuptype, usersignintype, usersignup, usersignin} from '../../../common/src/index'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>();

userRouter.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

const authenticateJWT = async (c: any, next: any) => {
  const jwt = c.req.header('Authorization');
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }

  const token = jwt.split(' ')[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  c.set('userId', String(payload.id));
  await next()
}


userRouter.use('/quiz/:id', authenticateJWT);
userRouter.use('/quizes', authenticateJWT);
userRouter.use('/submit/:id', authenticateJWT);
userRouter.use('/results', authenticateJWT);
userRouter.use('/quiz/leaderboard/:id', authenticateJWT);

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {success} = await usersignup.safeParse(body);
  if(!success){
    c.status(403);
    return c.json({message: 'Invalid inputs'});
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        username: body.username,
        password: body.password
      }
    })
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (error) {
    c.status(403);
    return c.text('Error during Signup');
  }
})

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = await usersignin.safeParse(body);
  if(!success){
    c.status(403);
    return c.json({message: 'Invalid inputs'});
  }

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

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });

  } catch (error) {
    c.status(403);
    return c.text("Invalid Credentials")
  }
})

//attempting the quiz
//attempting the quiz
userRouter.post('/quiz/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const quizid = await c.req.param('id');
  const userId = await c.get('userId');

  const quiz = await prisma.quiz.findUnique({
    where: {
      id: quizid,
      status: true
    }
  });

  if (!quiz) {
    c.status(403);
    return c.json({ message: "Quiz not found" });
  }

  // Fetch questions without the answerKey field
  const questions = await prisma.question.findMany({
    where: {
      quizId: quizid,
    },
    select: {
      id: true,
      text: true,
      optionA: true,
      optionB: true,
      optionC: true,
      optionD: true,
    },
  });

  return c.json({ questions });
});

//get all the live quizes
userRouter.get('/quizes', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const quizes = await prisma.quiz.findMany({
    where: {
      status: true
    }
  })
  return c.json({ quizes });
})

userRouter.post('/submit/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const quizId = c.req.param('id');
  const userId = await c.get('userId'); // Extract user ID from middleware context

  // Check if the quiz exists and is active (status: true)
  const quiz = await prisma.quiz.findUnique({
    where: {
      id: quizId,
      status: true,
    },
  });

  if (!quiz) {
    c.status(403);
    return c.json({ message: "Quiz not found!" });
  }

  // Fetch all questions for the quiz
  const questions = await prisma.question.findMany({
    where: {
      quizId: quizId,
    },
  });

  // Calculate score based on the user's answers
  let score = 0;
  questions.forEach((question) => {
    const answer = question.answerKey;
    if (answer === body.answers[question.id]) { // Assuming body.answers is an object with question IDs as keys
      score += 1;
    }
  });

  // Store the quiz result for the user
  await prisma.result.create({
    data: {
      score: score,
      userId: userId,
      quizId: quizId,
    },
  });

  // Check if the user already exists on the leaderboard for this quiz
  const existingEntry = await prisma.leaderboard.findFirst({
    where: {
      quizId: quizId,
      userId: userId,
    },
  });

  if (existingEntry) {
    // Update the user's score if they already have an entry
    await prisma.leaderboard.update({
      where: {
        id: existingEntry.id,
      },
      data: {
        score: score, // Update score if needed
      },
    });
  } else {
    // Create a new leaderboard entry if it doesn't exist
    await prisma.leaderboard.create({
      data: {
        quizId: quizId,
        userId: userId,
        score: score,
      },
    });
  }

  return c.json({ message: "Quiz submitted successfully", score });
});


userRouter.get('/results', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get('userId');

  const results = await prisma.result.findMany({
    where: { userId },
    include: {
      quiz: true
    }
  })
  return c.json({ results });
})

userRouter.get('/quiz/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = await c.req.param('id');

  const quiz = await prisma.quiz.findUnique({
    where: { id: id }
  })

  if (!quiz) {
    return c.json({ message: "Quiz not found" });
  }
  return c.json({ quiz });
});

userRouter.get('/quiz/leaderboard/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const quizid = await c.req.param('id');

  const leaderboard = await prisma.leaderboard.findMany({
    where: { quizId: quizid },
    orderBy: { score: 'desc' },
    include: { user: true }
  })
  return c.json({ leaderboard });
});