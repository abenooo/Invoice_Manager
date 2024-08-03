import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.body.userId || req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  if (req.method === 'GET') {
    try {
      const invoices = await prisma.invoice.findMany({
        where: { userId: parseInt(userId as string, 10) },
      });
      res.status(200).json(invoices);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch invoices' });
    }
  } else if (req.method === 'POST') {
    const { clientName, clientEmail, clientAddress, clientPhone, dueDate, totalAmount, items } = req.body;

    if (!clientName || !clientEmail || !clientAddress || !clientPhone || !dueDate || !totalAmount || !items) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const invoiceNumber = `INV-${Date.now()}`; // Generate a unique invoice number

      const newInvoice = await prisma.invoice.create({
        data: {
          invoiceNumber,
          clientName,
          clientEmail,
          clientAddress,
          clientPhone,
          dueDate: new Date(dueDate),
          totalAmount,
          userId: parseInt(userId as string, 10),
          items: `Item ${items}`, // Update to use a string for simplicity
        },
      });

      res.status(201).json(newInvoice);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create invoice' });
    }
  } else if (req.method === 'PUT') {
    const { id, clientName, clientEmail, clientAddress, clientPhone, dueDate, totalAmount, items } = req.body;
    try {
      const updatedInvoice = await prisma.invoice.update({
        where: { id: parseInt(id as string, 10) },
        data: {
          clientName,
          clientEmail,
          clientAddress,
          clientPhone,
          dueDate: new Date(dueDate),
          totalAmount,
          items: `Item ${items}`, // Update to use a string for simplicity
        },
      });
      res.status(200).json(updatedInvoice);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update invoice' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    try {
      await prisma.invoice.delete({
        where: { id: parseInt(id as string, 10) },
      });
      res.status(200).json({ message: 'Invoice deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete invoice' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
