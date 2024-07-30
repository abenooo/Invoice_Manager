"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type Invoice = {
  id: string;
  clientName: string;
  dueDate: string;
  total: number;
  lineItems: { description: string; quantity: number; price: number }[];
};

// Helper function to generate random invoices
const generateRandomInvoices = (count: number): Invoice[] => {
  const clients = [
    "Acme Inc.",
    "Stark Industries",
    "Wayne Enterprises",
    "LexCorp",
    "Oscorp",
  ];
  const descriptions = [
    "Web Design Services",
    "Consulting Services",
    "Graphic Design",
    "IT Consulting",
    "SEO Services",
    "Mobile App Development",
    "Digital Marketing",
  ];

  const getRandomElement = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];
  const getRandomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const getRandomDate = () =>
    new Date(Date.now() + getRandomNumber(1, 100) * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

  return Array.from({ length: count }, (_, index) => ({
    id: `INV${(index + 1).toString().padStart(3, "0")}`,
    clientName: getRandomElement(clients),
    dueDate: getRandomDate(),
    total: getRandomNumber(500, 5000),
    lineItems: [
      {
        description: getRandomElement(descriptions),
        quantity: getRandomNumber(1, 10),
        price: getRandomNumber(100, 1000),
      },
    ],
  }));
};

export default function Component() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    setInvoices(generateRandomInvoices(10));
  }, []);

  return (
    <div className="container py-8 space-y-8">
  <h1 className="text-2xl font-bold mb-4">Action</h1>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border rounded-lg shadow">
      <thead className="bg-gray-200">
        <tr>
          <th className="py-3 px-4 font-semibold text-left">Invoice #</th>
          <th className="py-3 px-4 font-semibold text-left">Client</th>
          <th className="py-3 px-4 font-semibold text-left">Due Date</th>
          <th className="py-3 px-4 font-semibold text-left">Total Amount</th>
          <th className="py-3 px-4 font-semibold text-left">Details</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id} className="border-t hover:bg-gray-50">
            <td className="py-3 px-4">{invoice.id}</td>
            <td className="py-3 px-4">{invoice.clientName}</td>
            <td className="py-3 px-4">
              {format(new Date(invoice.dueDate), "MMMM dd, yyyy")}
            </td>
            <td className="py-3 px-4">${invoice.total.toFixed(2)}</td>
            <td className="py-3 px-4">
              <Accordion type="single" collapsible>
                <AccordionItem value={invoice.id}>
                  <AccordionTrigger className="text-blue-500 underline cursor-pointer">
                    View Details
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-gray-50 border rounded-lg shadow mt-2">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="py-2 px-4 font-semibold text-left">Description</th>
                            <th className="py-2 px-4 font-semibold text-left">Quantity</th>
                            <th className="py-2 px-4 font-semibold text-left">Price</th>
                          </tr>
                          <tr>
                            <th className="py-2 px-4 font-semibold text-left">Description</th>
                            <th className="py-2 px-4 font-semibold text-left">Quantity</th>
                            <th className="py-2 px-4 font-semibold text-left">Price</th>
                          </tr>
                          
                        </thead>
                        <tbody>
                          {invoice.lineItems.map((item, index) => (
                            <tr key={index} className="border-t hover:bg-gray-100">
                              <td className="py-2 px-4">{item.description}</td>
                              <td className="py-2 px-4">{item.quantity}</td>
                              <td className="py-2 px-4">${item.price.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}
