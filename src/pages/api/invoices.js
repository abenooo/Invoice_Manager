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
    } catch (error) {
      console.error('Error fetching invoices:', error);
      res.status(500).json({ error: 'Failed to fetch invoices' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.body; // Assume the ID of the invoice to be deleted is sent in the request body
    try {
      console.log(`Attempting to delete invoice with ID: ${id}`);
      
      // Delete the associated items first
      await prisma.item.deleteMany({
        where: { invoiceId: Number(id) },
      });

      // Then delete the invoice
      const deletedInvoice = await prisma.invoice.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ message: 'Invoice deleted successfully', deletedInvoice });
    } catch (error) {
      console.error('Error deleting invoice:', error);
      res.status(500).json({ error: 'Failed to delete invoice' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
