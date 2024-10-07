import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { cors } from 'hono/cors';  // Import cors middleware
import { adminsignin, adminsignup } from "../../../common/src";

export const adminRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
    Variables: {
        userId: string
    }
}>();

adminRouter.use(cors({
    origin: '*', // Allows all origins, you can specify a specific origin if needed
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// JWT Authentication Middleware
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

// Apply the JWT authentication middleware to routes that require authentication
adminRouter.use('/create', authenticateJWT);
adminRouter.use('/delete/:id', authenticateJWT);
adminRouter.use('/dashboard', authenticateJWT);
adminRouter.use('/quiz/end/:id', authenticateJWT);


adminRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = adminsignup.safeParse(body);
    if(!success){
        c.status(403);
        return c.json({message: 'Invalid inputs'});
      }
    const admin = await prisma.admin.create({
        data: {
            name: body.name,
            username: body.username,
            position: body.position,
            password: body.password
        }
    })

    const jwt = await sign({ id: admin.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
})

adminRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = adminsignin.safeParse(body);
    if(!success){
    c.status(403);
    return c.json({message: 'Invalid inputs'});
  }
    const admin = await prisma.admin.findUnique({
        where: {
            username: body.username,
            password: body.password
        }
    })
    if (!admin) {
        c.status(403);
        return c.json({ message: "Invalid Credentials" });
    }
    const jwt = await sign({ id: admin.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
})

adminRouter.post('/create', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const userId = c.get('userId');
    const quiz = await prisma.quiz.create({
        data: {
            title: body.title,
            duration: body.duration,
            endAt: body.endAt,
            adminId: userId
        }
    })

    const questions = body.questions;
    for (const question of questions) {
        await prisma.question.create({
            data: {
                text: question.text,
                optionA: question.optionA,
                optionB: question.optionB,
                optionC: question.optionC,
                optionD: question.optionD,
                answerKey: question.answerKey,
                quizId: quiz.id,
            }
        })
    }
    return c.json({ message: "Quiz Created!", quizid: quiz.id})
})

adminRouter.delete('/delete/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const quizId = c.req.param('id');

    try {
        const quiz = await prisma.quiz.delete({
            where: {
                id: quizId,
            },
        });
        return c.json({ message: "Quiz deleted successfully" });
    } catch (error) {
        c.status(500);
        return c.json({ error: "Failed to delete quiz" });
    }
});

adminRouter.get('/dashboard', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const adminId = await c.get('userId');
        const quizzes = await prisma.quiz.findMany({
            where: {
                adminId: adminId,
            },
        });

        return c.json({ quizzes });
    } catch (error) {
        c.status(500);
        return c.json({ error: "Failed to load dashboard" });
    }
});

adminRouter.get('/quizzes', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const quizzes = await prisma.quiz.findMany({});
        return c.json({ quizzes });
    } catch (error) {
        c.status(500);
        return c.json({ error: "Failed to fetch quizzes" });
    }
});

adminRouter.get('/quiz/leaderboard/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const quizId = c.req.param('id');

    try {
        const leaderboard = await prisma.leaderboard.findMany({
            where: {
                quizId: quizId,
            },
            include: {
                user: true,
            },
            orderBy: {
                score: 'desc',
            },
        });

        return c.json({ leaderboard });
    } catch (error) {
        c.status(500);
        return c.json({ error: "Failed to fetch leaderboard" });
    }
});

adminRouter.put('/quiz/end/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const quizId = c.req.param('id');

    try {
        const quiz = await prisma.quiz.update({
            where: {
                id: quizId,
            },
            data: {
                status: false,
            },
        });
        return c.json({ message: "Quiz ended successfully", quiz });
    } catch (error) {
        c.status(500);
        return c.json({ error: "Failed to end quiz" });
    }
});
