import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
  origin: '*' // Allow all origins
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Include the userId in the response
      res.status(200).json({ email: user.email, userId: user.id });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
