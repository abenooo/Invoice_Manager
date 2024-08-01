import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const invoices = await prisma.invoice.findMany({
        include: {
          items: true,
        },
      });
      res.status(200).json(invoices);
      console.log("Invoices fetched successfully.");
    } catch (error) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({ error: 'Failed to fetch invoices' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
