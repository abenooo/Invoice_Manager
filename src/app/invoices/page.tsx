// "use client";
// import { useState, useEffect } from "react";
// import { format } from "date-fns";
// import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Skeleton from "../Skeleton/Loading";

// interface Invoice {
//   id: number;
//   clientName: string;
//   clientEmail: string;
//   clientAddress: string;
//   clientPhone: string;
//   dueDate: string;
//   totalAmount: number;
//   items: string;
// }

// interface User {
//   email: string;
//   userId: number;
// }

// export default function InvoicesComponent() {
//   const [invoices, setInvoices] = useState<Invoice[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isCreating, setIsCreating] = useState(false);
//   const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
//   const [newInvoice, setNewInvoice] = useState<Invoice>({
//     id: 0,
//     clientName: '',
//     clientEmail: '',
//     clientAddress: '',
//     clientPhone: '',
//     dueDate: '',
//     totalAmount: 0,
//     items: '1'
//   });
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem("user") || "null") as User | null;
//     setUser(loggedInUser);

//     if (loggedInUser && loggedInUser.userId) {
//       fetchInvoices(loggedInUser.userId);
//     } else {
//       toast.error("User data is missing. Please log in again.");
//       // Optionally, redirect to login page
//     }
//   }, []);

//   const fetchInvoices = async (userId: number) => {
//     try {
//       const response = await fetch(`/api/invoices?userId=${userId}`);
//       const data = await response.json();
//       setInvoices(data);
//     } catch (error) {
//       console.error("Failed to fetch invoices:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const deleteInvoice = async (id: number) => {
//     try {
//       const response = await fetch(`/api/invoices`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id }),
//       });
//       if (response.ok) {
//         setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
//         setIsDeleting(false);
//       } else {
//         console.error("Failed to delete invoice");
//       }
//     } catch (error) {
//       console.error("Failed to delete invoice:", error);
//     }
//   };

//   const updateInvoice = async (updatedInvoice: Invoice) => {
//     try {
//       const response = await fetch(`/api/invoices`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedInvoice),
//       });
//       if (response.ok) {
//         setInvoices((prev) =>
//           prev.map((invoice) =>
//             invoice.id === updatedInvoice.id ? updatedInvoice : invoice
//           )
//         );
//         setIsEditing(false);
//       } else {
//         console.error("Failed to update invoice");
//       }
//     } catch (error) {
//       console.error("Failed to update invoice:", error);
//     }
//   };

//   const createInvoice = async () => {
//     if (!user || !user.userId) {
//       toast.error("User ID is missing. Please log in again.");
//       return;
//     }

//     try {
//       const response = await fetch(`/api/invoices`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ...newInvoice, userId: user.userId }),
//       });
//       if (response.ok) {
//         const createdInvoice = await response.json();
//         setInvoices((prev) => [...prev, createdInvoice]);
//         setIsCreating(false);
//         toast.success("Invoice created successfully!");
//       } else {
//         console.error("Failed to create invoice");
//         toast.error("Failed to create invoice");
//       }
//     } catch (error) {
//       console.error("Failed to create invoice:", error);
//       toast.error("Failed to create invoice");
//     }
//   };

//   return (
//     <div className="container py-8 space-y-8">
//       <h1 className="text-2xl font-bold mb-4">Invoices</h1>
//       <Button className="mb-4 bg-green-500 text-white" onClick={() => setIsCreating(true)}>Create New Invoice</Button>
//       <div className="overflow-x-auto">
//         {isLoading ? (
//           <Skeleton />
//         ) : (
//           <table className="min-w-full bg-white border rounded-lg shadow">
//             <thead className="bg-muted">
//               <tr>
//                 <th className="py-3 px-4 font-semibold text-left">Invoice #</th>
//                 <th className="py-3 px-4 font-semibold text-left">Client</th>
//                 <th className="py-3 px-4 font-semibold text-left">Due Date</th>
//                 <th className="py-3 px-4 font-semibold text-left">Total Amount</th>
//                 <th className="py-3 px-4 font-semibold text-left">Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Array.isArray(invoices) && invoices.map((invoice) => (
//                 <tr key={invoice.id} className="border-t hover:bg-gray-50">
//                   <td className="py-3 px-4">{invoice.id}</td>
//                   <td className="py-3 px-4">{invoice.clientName}</td>
//                   <td className="py-3 px-4">{format(new Date(invoice.dueDate), "MMMM dd, yyyy")}</td>
//                   <td className="py-3 px-4">${invoice.totalAmount.toFixed(2)}</td>
//                   <td className="py-3 px-4">
//                     <Accordion type="single" collapsible>
//                       <AccordionItem value={invoice.id.toString()}>
//                         <AccordionTrigger className="text-blue-500 underline cursor-pointer">
//                           View Details
//                         </AccordionTrigger>
//                         <AccordionContent>
//                           <div className="w-full bg-white border rounded-lg shadow p-4 mt-2">
//                             <div className="bg-purple-500 p-4 rounded-t-lg">
//                               <h2 className="text-lg font-bold text-white">
//                                 Invoice {invoice.id}
//                               </h2>
//                               <p className="text-white">
//                                 Client: {invoice.clientName}
//                               </p>
//                               <p className="text-white">
//                                 Due Date:{" "}
//                                 {format(new Date(invoice.dueDate), "MMMM dd, yyyy")}
//                               </p>
//                             </div>
//                             <div className="p-4">
//                               <h3 className="font-semibold mb-2">Selected Item</h3>
//                               <p>Item: {invoice.items}</p>
//                             </div>
//                             <div className="p-4 bg-gray-100 border-t flex justify-between items-center rounded-b-lg">
//                               <div>
//                                 <p className="font-bold">Total: ${invoice.totalAmount.toFixed(2)}</p>
//                               </div>
//                               <div className="flex space-x-2">
//                                 <Button
//                                   className="bg-blue-500 text-white"
//                                   onClick={() => {
//                                     setIsEditing(true);
//                                     setCurrentInvoice(invoice);
//                                   }}
//                                 >
//                                   Edit
//                                 </Button>
//                                 <Button
//                                   className="bg-red-500 text-white"
//                                   onClick={() => {
//                                     setIsDeleting(true);
//                                     setCurrentInvoice(invoice);
//                                   }}
//                                 >
//                                   Delete
//                                 </Button>
//                               </div>
//                             </div>
//                           </div>
//                         </AccordionContent>
//                       </AccordionItem>
//                     </Accordion>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {isCreating && (
//         <Dialog open={isCreating} onOpenChange={() => setIsCreating(false)}>
//           <DialogContent>
//             <DialogTitle>Create New Invoice</DialogTitle>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 createInvoice();
//               }}
//             >
//               <Label htmlFor="clientName">Client Name</Label>
//               <Input
//                 id="clientName"
//                 name="clientName"
//                 value={newInvoice.clientName}
//                 onChange={(e) =>
//                   setNewInvoice({
//                     ...newInvoice,
//                     clientName: e.target.value,
//                   })
//                 }
//                 required
//               />

//               <Label htmlFor="clientEmail">Client Email</Label>
//               <Input
//                 id="clientEmail"
//                 name="clientEmail"
//                 type="email"
//                 value={newInvoice.clientEmail}
//                 onChange={(e) =>
//                   setNewInvoice({
//                     ...newInvoice,
//                     clientEmail: e.target.value,
//                   })
//                 }
//                 required
//               />

//               <Label htmlFor="clientAddress">Client Address</Label>
//               <Input
//                 id="clientAddress"
//                 name="clientAddress"
//                 value={newInvoice.clientAddress}
//                 onChange={(e) =>
//                   setNewInvoice({
//                     ...newInvoice,
//                     clientAddress: e.target.value,
//                   })
//                 }
//                 required
//               />

//               <Label htmlFor="clientPhone">Client Phone</Label>
//               <Input
//                 id="clientPhone"
//                 name="clientPhone"
//                 value={newInvoice.clientPhone}
//                 onChange={(e) =>
//                   setNewInvoice({
//                     ...newInvoice,
//                     clientPhone: e.target.value,
//                   })
//                 }
//                 required
//               />

//               <Label htmlFor="dueDate">Due Date</Label>
//               <Input
//                 id="dueDate"
//                 name="dueDate"
//                 type="date"
//                 value={newInvoice.dueDate}
//                 onChange={(e) =>
//                   setNewInvoice({
//                     ...newInvoice,
//                     dueDate: e.target.value,
//                   })
//                 }
//                 required
//               />

//               <Label htmlFor="totalAmount">Total Amount</Label>
//               <Input
//                 id="totalAmount"
//                 name="totalAmount"
//                 type="number"
//                 value={newInvoice.totalAmount.toString()}
//                 onChange={(e) =>
//                   setNewInvoice({
//                     ...newInvoice,
//                     totalAmount: parseFloat(e.target.value),
//                   })
//                 }
//                 required
//               />

//               <Label htmlFor="items">Items</Label>
//               <Select
//                 name="items"
//                 value={newInvoice.items}
//                 onValueChange={(value) =>
//                   setNewInvoice({
//                     ...newInvoice,
//                     items: value,
//                   })
//                 }
//                 required
//               >
//                 <SelectTrigger>
//                   Select Item
//                 </SelectTrigger>
//                 <SelectContent>
//                   {[1, 2, 3, 4, 5].map((item) => (
//                     <SelectItem key={item} value={item.toString()}>
//                       Item {item}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               <DialogFooter>
//                 <Button type="submit" className="bg-green-500 text-white">
//                   Create
//                 </Button>
//                 <Button
//                   onClick={() => setIsCreating(false)}
//                   className="bg-gray-500 text-white"
//                 >
//                   Cancel
//                 </Button>
//               </DialogFooter>
//             </form>
//           </DialogContent>
//         </Dialog>
//       )}

//       {isEditing && currentInvoice && (
//         <Dialog open={isEditing} onOpenChange={() => setIsEditing(false)}>
//           <DialogContent>
//             <DialogTitle>Edit Invoice</DialogTitle>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 updateInvoice(currentInvoice);
//               }}
//             >
//               <Label htmlFor="clientName">Client Name</Label>
//               <Input
//                 id="clientName"
//                 name="clientName"
//                 value={currentInvoice.clientName}
//                 onChange={(e) =>
//                   setCurrentInvoice({
//                     ...currentInvoice,
//                     clientName: e.target.value,
//                   })
//                 }
//                 required
//               />

//               <Label htmlFor="clientEmail">Client Email</Label>
//               <Input
//                 id="clientEmail"
//                 name="clientEmail"
//                 type="email"
//                 value={currentInvoice.clientEmail}
//                 onChange={(e) =>
//                   setCurrentInvoice({
//                     ...currentInvoice,
//                     clientEmail: e.target.value,
//                   })
//                 }
//                 required
//               />

//               <Label htmlFor="clientAddress">Client Address</Label>
//               <Input
//                 id="clientAddress"
//                 name="clientAddress"
//                 value={currentInvoice.clientAddress}
//                 onChange={(e) =>
//                   setCurrentInvoice({
//                     ...currentInvoice,
//                     clientAddress: e.target.value,
//                   })
//                 }
//                 required
//               />

//               <Label htmlFor="clientPhone">Client Phone</Label>
//               <Input
//                 id="clientPhone"
//                 name="clientPhone"
//                 value={currentInvoice.clientPhone}
//                 onChange={(e) =>
//                   setCurrentInvoice({
//                     ...currentInvoice,
//                     clientPhone: e.target.value,
//                   })
//                 }
//                 required
//               />

//               <Label htmlFor="dueDate">Due Date</Label>
//               <Input
//                 id="dueDate"
//                 name="dueDate"
//                 type="date"
//                 value={format(new Date(currentInvoice.dueDate), "yyyy-MM-dd")}
//                 onChange={(e) =>
//                   setCurrentInvoice({
//                     ...currentInvoice,
//                     dueDate: e.target.value,
//                   })
//                 }
//                 required
//               />

//               <Label htmlFor="totalAmount">Total Amount</Label>
//               <Input
//                 id="totalAmount"
//                 name="totalAmount"
//                 type="number"
//                 value={currentInvoice.totalAmount.toString()}
//                 onChange={(e) =>
//                   setCurrentInvoice({
//                     ...currentInvoice,
//                     totalAmount: parseFloat(e.target.value),
//                   })
//                 }
//                 required
//               />

//               <Label htmlFor="items">Items</Label>
//               <Select
//                 name="items"
//                 value={currentInvoice.items}
//                 onValueChange={(value) =>
//                   setCurrentInvoice({
//                     ...currentInvoice,
//                     items: value,
//                   })
//                 }
//                 required
//               >
//                 <SelectTrigger>
//                   Select Item
//                 </SelectTrigger>
//                 <SelectContent>
//                   {[1, 2, 3, 4, 5].map((item) => (
//                     <SelectItem key={item} value={item.toString()}>
//                       Item {item}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               <DialogFooter>
//                 <Button type="submit" className="bg-blue-500 text-white">
//                   Save
//                 </Button>
//                 <Button
//                   onClick={() => setIsEditing(false)}
//                   className="bg-gray-500 text-white"
//                 >
//                   Cancel
//                 </Button>
//               </DialogFooter>
//             </form>
//           </DialogContent>
//         </Dialog>
//       )}

//       {isDeleting && currentInvoice && (
//         <Dialog open={isDeleting} onOpenChange={() => setIsDeleting(false)}>
//           <DialogContent>
//             <DialogTitle>Delete Invoice</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this invoice? This action cannot be
//               undone.
//             </DialogDescription>
//             <DialogFooter>
//               <Button
//                 onClick={() => deleteInvoice(currentInvoice.id)}
//                 className="bg-red-500 text-white"
//               >
//                 Delete
//               </Button>
//               <Button
//                 onClick={() => setIsDeleting(false)}
//                 className="bg-gray-500 text-white"
//               >
//                 Cancel
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       )}
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "../Skeleton/Loading";

interface Invoice {
  id: number;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  clientPhone: string;
  dueDate: string;
  totalAmount: number;
  items: string;
}

interface User {
  email: string;
  userId: number;
}

export default function InvoicesComponent() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [newInvoice, setNewInvoice] = useState<Invoice>({
    id: 0,
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    clientPhone: '',
    dueDate: '',
    totalAmount: 0,
    items: '1'
  });
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user") || "null") as User | null;
    setUser(loggedInUser);

    if (loggedInUser && loggedInUser.userId) {
      fetchInvoices(loggedInUser.userId);
    } else {
      toast.error("User data is missing. Please log in again.");
      // Optionally, redirect to login page
    }
  }, []);

  const fetchInvoices = async (userId: number) => {
    try {
      const response = await fetch(`/api/invoices?userId=${userId}`);
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteInvoice = async (id: number) => {
    if (!user || !user.userId) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`/api/invoices`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, userId: user.userId }), // Include userId in the request body
      });
      if (response.ok) {
        setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
        setIsDeleting(false);
        toast.success("Invoice deleted successfully!");
      } else {
        console.error("Failed to delete invoice");
        toast.error("Failed to delete invoice");
      }
    } catch (error) {
      console.error("Failed to delete invoice:", error);
      toast.error("Failed to delete invoice");
    }
  };

  const updateInvoice = async (updatedInvoice: Invoice) => {
    try {
      const response = await fetch(`/api/invoices`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedInvoice),
      });
      if (response.ok) {
        setInvoices((prev) =>
          prev.map((invoice) =>
            invoice.id === updatedInvoice.id ? updatedInvoice : invoice
          )
        );
        setIsEditing(false);
      } else {
        console.error("Failed to update invoice");
      }
    } catch (error) {
      console.error("Failed to update invoice:", error);
    }
  };

  const createInvoice = async () => {
    if (!user || !user.userId) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`/api/invoices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newInvoice, userId: user.userId }),
      });
      if (response.ok) {
        const createdInvoice = await response.json();
        setInvoices((prev) => [...prev, createdInvoice]);
        setIsCreating(false);
        toast.success("Invoice created successfully!");
      } else {
        console.error("Failed to create invoice");
        toast.error("Failed to create invoice");
      }
    } catch (error) {
      console.error("Failed to create invoice:", error);
      toast.error("Failed to create invoice");
    }
  };

  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <Button className="mb-4 bg-green-500 text-white" onClick={() => setIsCreating(true)}>Create New Invoice</Button>
      <div className="overflow-x-auto">
        {isLoading ? (
          <Skeleton />
        ) : (
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
              {Array.isArray(invoices) && invoices.map((invoice) => (
                <tr key={invoice.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{invoice.id}</td>
                  <td className="py-3 px-4">{invoice.clientName}</td>
                  <td className="py-3 px-4">{format(new Date(invoice.dueDate), "MMMM dd, yyyy")}</td>
                  <td className="py-3 px-4">${invoice.totalAmount.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <Accordion type="single" collapsible>
                      <AccordionItem value={invoice.id.toString()}>
                        <AccordionTrigger className="text-blue-500 underline cursor-pointer">
                          View Details
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="w-full bg-white border rounded-lg shadow p-4 mt-2">
                            <div className="bg-purple-500 p-4 rounded-t-lg">
                              <h2 className="text-lg font-bold text-white">
                                Invoice {invoice.id}
                              </h2>
                              <p className="text-white">
                                Client: {invoice.clientName}
                              </p>
                              <p className="text-white">
                                Due Date:{" "}
                                {format(new Date(invoice.dueDate), "MMMM dd, yyyy")}
                              </p>
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold mb-2">Selected Item</h3>
                              <p>Item: {invoice.items}</p>
                            </div>
                            <div className="p-4 bg-gray-100 border-t flex justify-between items-center rounded-b-lg">
                              <div>
                                <p className="font-bold">Total: ${invoice.totalAmount.toFixed(2)}</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  className="bg-blue-500 text-white"
                                  onClick={() => {
                                    setIsEditing(true);
                                    setCurrentInvoice(invoice);
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  className="bg-red-500 text-white"
                                  onClick={() => {
                                    setIsDeleting(true);
                                    setCurrentInvoice(invoice);
                                  }}
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isCreating && (
        <Dialog open={isCreating} onOpenChange={() => setIsCreating(false)}>
          <DialogContent>
            <DialogTitle>Create New Invoice</DialogTitle>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createInvoice();
              }}
            >
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                name="clientName"
                value={newInvoice.clientName}
                onChange={(e) =>
                  setNewInvoice({
                    ...newInvoice,
                    clientName: e.target.value,
                  })
                }
                required
              />

              <Label htmlFor="clientEmail">Client Email</Label>
              <Input
                id="clientEmail"
                name="clientEmail"
                type="email"
                value={newInvoice.clientEmail}
                onChange={(e) =>
                  setNewInvoice({
                    ...newInvoice,
                    clientEmail: e.target.value,
                  })
                }
                required
              />

              <Label htmlFor="clientAddress">Client Address</Label>
              <Input
                id="clientAddress"
                name="clientAddress"
                value={newInvoice.clientAddress}
                onChange={(e) =>
                  setNewInvoice({
                    ...newInvoice,
                    clientAddress: e.target.value,
                  })
                }
                required
              />

              <Label htmlFor="clientPhone">Client Phone</Label>
              <Input
                id="clientPhone"
                name="clientPhone"
                value={newInvoice.clientPhone}
                onChange={(e) =>
                  setNewInvoice({
                    ...newInvoice,
                    clientPhone: e.target.value,
                  })
                }
                required
              />

              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={newInvoice.dueDate}
                onChange={(e) =>
                  setNewInvoice({
                    ...newInvoice,
                    dueDate: e.target.value,
                  })
                }
                required
              />

              <Label htmlFor="totalAmount">Total Amount</Label>
              <Input
                id="totalAmount"
                name="totalAmount"
                type="number"
                value={newInvoice.totalAmount.toString()}
                onChange={(e) =>
                  setNewInvoice({
                    ...newInvoice,
                    totalAmount: parseFloat(e.target.value),
                  })
                }
                required
              />

              <Label htmlFor="items">Items</Label>
              <Select
                name="items"
                value={newInvoice.items}
                onValueChange={(value) =>
                  setNewInvoice({
                    ...newInvoice,
                    items: value,
                  })
                }
                required
              >
                <SelectTrigger>
                  Select Item
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <SelectItem key={item} value={item.toString()}>
                      Item {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <DialogFooter>
                <Button type="submit" className="bg-green-500 text-white">
                  Create
                </Button>
                <Button
                  onClick={() => setIsCreating(false)}
                  className="bg-gray-500 text-white"
                >
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {isEditing && currentInvoice && (
        <Dialog open={isEditing} onOpenChange={() => setIsEditing(false)}>
          <DialogContent>
            <DialogTitle>Edit Invoice</DialogTitle>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateInvoice(currentInvoice);
              }}
            >
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                name="clientName"
                value={currentInvoice.clientName}
                onChange={(e) =>
                  setCurrentInvoice({
                    ...currentInvoice,
                    clientName: e.target.value,
                  })
                }
                required
              />

              <Label htmlFor="clientEmail">Client Email</Label>
              <Input
                id="clientEmail"
                name="clientEmail"
                type="email"
                value={currentInvoice.clientEmail}
                onChange={(e) =>
                  setCurrentInvoice({
                    ...currentInvoice,
                    clientEmail: e.target.value,
                  })
                }
                required
              />

              <Label htmlFor="clientAddress">Client Address</Label>
              <Input
                id="clientAddress"
                name="clientAddress"
                value={currentInvoice.clientAddress}
                onChange={(e) =>
                  setCurrentInvoice({
                    ...currentInvoice,
                    clientAddress: e.target.value,
                  })
                }
                required
              />

              <Label htmlFor="clientPhone">Client Phone</Label>
              <Input
                id="clientPhone"
                name="clientPhone"
                value={currentInvoice.clientPhone}
                onChange={(e) =>
                  setCurrentInvoice({
                    ...currentInvoice,
                    clientPhone: e.target.value,
                  })
                }
                required
              />

              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={format(new Date(currentInvoice.dueDate), "yyyy-MM-dd")}
                onChange={(e) =>
                  setCurrentInvoice({
                    ...currentInvoice,
                    dueDate: e.target.value,
                  })
                }
                required
              />

              <Label htmlFor="totalAmount">Total Amount</Label>
              <Input
                id="totalAmount"
                name="totalAmount"
                type="number"
                value={currentInvoice.totalAmount.toString()}
                onChange={(e) =>
                  setCurrentInvoice({
                    ...currentInvoice,
                    totalAmount: parseFloat(e.target.value),
                  })
                }
                required
              />

              <Label htmlFor="items">Items</Label>
              <Select
                name="items"
                value={currentInvoice.items}
                onValueChange={(value) =>
                  setCurrentInvoice({
                    ...currentInvoice,
                    items: value,
                  })
                }
                required
              >
                <SelectTrigger>
                  Select Item
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <SelectItem key={item} value={item.toString()}>
                      Item {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <DialogFooter>
                <Button type="submit" className="bg-blue-500 text-white">
                  Save
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white"
                >
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {isDeleting && currentInvoice && (
        <Dialog open={isDeleting} onOpenChange={() => setIsDeleting(false)}>
          <DialogContent>
            <DialogTitle>Delete Invoice</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this invoice? This action cannot be
              undone.
            </DialogDescription>
            <DialogFooter>
              <Button
                onClick={() => deleteInvoice(currentInvoice.id)}
                className="bg-red-500 text-white"
              >
                Delete
              </Button>
              <Button
                onClick={() => setIsDeleting(false)}
                className="bg-gray-500 text-white"
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
