import React from "react";

export default function Skeleton() {
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
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  