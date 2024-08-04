import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST', 'DELETE', 'PUT'],
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
    const { userId, clientName, clientEmail, clientAddress, clientPhone, dueDate, totalAmount, items, invoiceNumber } = req.body;

    if (!userId || !clientName || !clientEmail || !clientAddress || !clientPhone || !dueDate || !totalAmount || !items || !invoiceNumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const invoice = await prisma.invoice.create({
        data: {
          invoiceNumber, // Include invoiceNumber here
          clientName,
          clientEmail,
          clientAddress,
          clientPhone,
          dueDate: new Date(dueDate),
          totalAmount,
          items: `Item ${items}`, // Update to use a string for simplicity
          userId: parseInt(userId as string, 10),
        },
      });
      res.status(201).json(invoice);
    } catch (error) {
      res.status(500).json({ error: "Failed to create invoice", details: (error as Error).message });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Missing invoice ID" });
    }

    try {
      await prisma.invoice.delete({
        where: { id: parseInt(id as string, 10) },
      });
      res.status(204).end();
    } catch (error) {
      res.status  (500).json({ error: "Failed to delete invoice", details: (error as Error).message });
    }
  } else if (req.method === 'GET') {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    try {
      const invoices = await prisma.invoice.findMany({
        where: { userId: parseInt(userId as string, 10) },
      });
      res.status(200).json(invoices);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch invoices", details: (error as Error).message });
    }
  } else if (req.method === 'PUT') {
    const { id, clientName, clientEmail, clientAddress, clientPhone, dueDate, totalAmount, items, invoiceNumber } = req.body;

    if (!id || !clientName || !clientEmail || !clientAddress || !clientPhone || !dueDate || !totalAmount || !items || !invoiceNumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const invoice = await prisma.invoice.update({
        where: { id: parseInt(id as string, 10) },
        data: {
          invoiceNumber, // Include invoiceNumber here
          clientName,
          clientEmail,
          clientAddress,
          clientPhone,
          dueDate: new Date(dueDate),
          totalAmount,
          items: `Item ${items}`, // Update to use a string for simplicity
        },
      });
      res.status(200).json(invoice);
    } catch (error) {
      res.status(500).json({ error: "Failed to update invoice", details: (error as Error).message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
