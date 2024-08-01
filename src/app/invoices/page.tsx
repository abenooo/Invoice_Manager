"use client"
import Skeleton from "../Skeleton/Loading"
import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";

type LineItem = {
  description: string;
  quantity: number;
  unitPrice: number;
};

type Invoice = {
  id: string;
  clientName: string;
  dueDate: string;
  total: number;
  items: LineItem[];
};

const calculateSubtotal = (lineItems: LineItem[]): number => {
  return lineItems.reduce((sum, item) => sum + (item.quantity * (item.unitPrice ?? 0)), 0);
};

const TAX_RATE = 0.1;

export default function Component() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch('/api/invoices');
        const data = await response.json();
        console.log("Data", data);
        setInvoices(data);
      } catch (error) {
        console.error('Failed to fetch invoices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const deleteInvoice = async (id: string) => {
    try {
      const response = await fetch('/api/invoices', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setInvoices(invoices.filter((invoice) => invoice.id !== id));
        <Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    Deleted invoice successfully
  </AlertDescription>
</Alert>

      } else {
        console.error('Failed to delete invoice');
      }
    } catch (error) {
      console.error('Failed to delete invoice:', error);
    }
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead className="bg-muted">
            <tr>
              <th className="py-3 px-4 font-semibold text-left">Invoice #</th>
              <th className="py-3 px-4 font-semibold text-left">Client</th>
              <th className="py-3 px-4 font-semibold text-left">Due Date</th>
              <th className="py-3 px-4 font-semibold text-left">Total Amount</th>
              <th className="py-3 px-4 font-semibold text-left">Details</th>
            </tr>
          </thead>
          <tbody className="">
            {invoices.map((invoice) => {
              const subtotal = calculateSubtotal(invoice.items);
              const tax = subtotal * TAX_RATE;
              const total = subtotal + tax;

              return (
                <tr key={invoice.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{invoice.id}</td>
                  <td className="py-3 px-4">{invoice.clientName}</td>
                  <td className="py-3 px-4">
                    {format(new Date(invoice.dueDate), "MMMM dd, yyyy")}
                  </td>
                  <td className="py-3 px-4">${total.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <Accordion type="single" collapsible>
                      <AccordionItem value={invoice.id}>
                        <AccordionTrigger className="text-blue-500 underline cursor-pointer">
                          View Details
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="w-full bg-white border rounded-lg shadow p-4 mt-2">
                            <div className="bg-purple-500 p-4 rounded-t-lg">
                              <h2 className="text-lg font-bold text-white">Invoice {invoice.id}</h2>
                              <p className="text-white">Client: {invoice.clientName}</p>
                              <p className="text-white">Due Date: {format(new Date(invoice.dueDate), "MMMM dd, yyyy")}</p>
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold mb-2">Line Items</h3>
                              <ul className="list-disc list-inside">
                                {invoice.items.map((item, index) => {
                                  console.log("Item", item); // Log the item to debug
                                  return (
                                    <li key={index} className="mb-1">
                                      <span className="font-semibold">{item.description}</span>: {item.quantity ?? 0} x ${item.unitPrice ? item.unitPrice.toFixed(2) : '0.00'}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                            <div className="p-4 bg-gray-100 border-t flex justify-between items-center rounded-b-lg">
                              <div>
                                <p className="font-semibold">Subtotal: ${subtotal.toFixed(2)}</p>
                                <p className="font-semibold">Tax (10%): ${tax.toFixed(2)}</p>
                                <p className="font-bold">Total: ${total.toFixed(2)}</p>
                              </div>
                              <div className="flex space-x-2">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Edit</button>
                                <button 
                                  onClick={() => deleteInvoice(invoice.id)}
                                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
