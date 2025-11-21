'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { CurrencySelector, getCurrencySymbol } from "@/components/CurrencySelector";
import { Trash2, Plus, Download } from "lucide-react";

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
}

const InvoiceGenerator = () => {
  const [from, setFrom] = useState("Your Company\n123 Street\nCity, State, 12345");
  const [to, setTo] = useState("Client Company\n456 Avenue\nCity, State, 67890");
  const [invoiceNumber, setInvoiceNumber] = useState("1");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<LineItem[]>([{ description: "", quantity: 1, rate: 0 }]);
  const [currency, setCurrency] = useState("USD");
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);
  
  const handleItemChange = (index: number, field: keyof LineItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, rate: 0 }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };
  
  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.rate, 0);

  const printInvoice = () => {
    const printContent = `
        <style>
            body { font-family: sans-serif; margin: 2rem; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .header, .totals { display: flex; justify-content: space-between; }
            .totals { flex-direction: column; align-items: flex-end; margin-top: 20px;}
        </style>
        <h1>Invoice</h1>
        <div class="header">
            <div><strong>From:</strong><br>${from.replace(/\n/g, '<br>')}</div>
            <div><strong>To:</strong><br>${to.replace(/\n/g, '<br>')}</div>
        </div>
        <p><strong>Invoice #:</strong> ${invoiceNumber}</p>
        <p><strong>Date:</strong> ${date}</p>
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${items.map(item => `
                    <tr>
                        <td>${item.description}</td>
                        <td>${item.quantity}</td>
                        <td>${currencySymbol}${item.rate.toFixed(2)}</td>
                        <td>${currencySymbol}${(item.quantity * item.rate).toFixed(2)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <div class="totals">
            <h3>Subtotal: ${currencySymbol}${subtotal.toFixed(2)}</h3>
            <h3>Total: ${currencySymbol}${subtotal.toFixed(2)}</h3>
        </div>
    `;
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    } else {
        toast({ title: "Error", description: "Could not open print window. Please disable your pop-up blocker.", variant: "destructive" });
    }
  };

  return (
    <CalculatorLayout
      title="Invoice Generator"
      description="Create and download professional invoices for your business."
      canonicalUrl="/tool/invoice-generator"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label>From</Label><Textarea value={from} onChange={e => setFrom(e.target.value)} /></div>
            <div><Label>To</Label><Textarea value={to} onChange={e => setTo(e.target.value)} /></div>
          </div>
           <div className="grid md:grid-cols-3 gap-4">
              <div><Label>Invoice #</Label><Input value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} /></div>
              <div><Label>Date</Label><Input type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
              <CurrencySelector value={currency} onChange={setCurrency} />
           </div>
          
          <Card>
            <CardHeader><CardTitle>Line Items</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-[1fr,80px,120px,auto] gap-2 items-center">
                  <Input placeholder="Description" value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} />
                  <Input type="number" placeholder="Qty" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', parseFloat(e.target.value))} />
                  <Input type="number" placeholder="Rate" value={item.rate} onChange={e => handleItemChange(index, 'rate', parseFloat(e.target.value))} />
                  <Button variant="ghost" size="icon" onClick={() => removeItem(index)}><Trash2 className="text-destructive"/></Button>
                </div>
              ))}
              <Button variant="outline" onClick={addItem}><Plus className="mr-2" /> Add Item</Button>
            </CardContent>
          </Card>

          <div className="text-right font-bold text-xl">
              Total: {currencySymbol}{subtotal.toFixed(2)}
          </div>
          
          <Button onClick={printInvoice} className="w-full gradient-button"><Download className="mr-2"/> Print / Download PDF</Button>
        </div>
      </Card>
       <CalculatorContentSection
        aboutContent="The Invoice Generator is a practical tool designed for freelancers, small business owners, and contractors to create clean, professional invoices without the need for complex accounting software. An invoice is a commercial document that itemizes and records a transaction between a buyer and a seller. A professional invoice not only serves as a formal request for payment but also as a legal document that records the services rendered or products sold. This tool simplifies the process by providing a clear, structured template where users can input their details, client information, line items with descriptions, quantities, and rates. It automatically calculates subtotals and totals, minimizing errors and saving valuable time. The final output is a print-ready document that can also be saved as a PDF, ensuring a professional presentation to clients. In today's gig economy and with the rise of small businesses, having a quick and reliable way to generate invoices is crucial for maintaining healthy cash flow and projecting a professional image."
        useCases={[
            { title: "Freelance Services", description: "Freelance writers, designers, developers, and consultants can create detailed invoices for their projects, itemizing tasks or hours worked to ensure clear and transparent billing for their clients." },
            { title: "Small Business Sales", description: "Small retail businesses or e-commerce stores can generate invoices for individual sales, providing customers with a detailed receipt of their purchase, which is essential for returns or record-keeping." },
            { title: "Contract and Construction Work", description: "Contractors can create itemized invoices that separate costs for materials, labor, and other expenses, providing clients with a comprehensive breakdown of project costs." },
            { title: "Rental Services", description: "Individuals or businesses renting out equipment, property, or venues can create recurring or one-time invoices for their tenants or clients." },
        ]}
        examples={[
          {
            title: "Example: Web Designer Invoicing a Client",
            description: "A freelance web designer has completed a project for a new website and needs to bill the client.",
            steps: [
              "In the 'From' field, enter your name, business name, and address.",
              "In the 'To' field, enter the client's name and business address.",
              "Set the Invoice # and Date.",
              "Add the first line item: 'Website Design & Development', Quantity: 1, Rate: 2500.",
              "Add a second line item: 'Logo Design', Quantity: 1, Rate: 500.",
              "Add a third line item: 'Monthly Hosting - First Month', Quantity: 1, Rate: 25.",
              "The calculator will show a total of $3025.",
              "Click 'Print / Download PDF' to generate the invoice to send to the client."
            ]
          },
          {
            title: "Example: Photographer Billing for an Event",
            description: "A photographer needs to invoice a client for a wedding photography package.",
            steps: [
              "Fill in the 'From' and 'To' details for the photographer and the client.",
              "Add the first line item: 'Full-Day Wedding Photography Package', Quantity: 1, Rate: 3000.",
              "Add a second line item for an add-on: 'Second Shooter', Quantity: 1, Rate: 600.",
              "Add a third line item for physical products: 'Fine Art Wedding Album', Quantity: 1, Rate: 800.",
              "The calculator provides the final total. Use the 'Download PDF' option to create a professional invoice for the client."
            ]
          }
        ]}
        tips={[
            { title: "Be Detailed in Descriptions", description: "Instead of a generic 'Consulting Work', write 'Social Media Strategy Consulting (10 hours)'. Clear descriptions prevent client disputes and questions, leading to faster payments." },
            { title: "Establish Clear Payment Terms", description: "Explicitly state your payment terms on the invoice. Common terms include 'Net 30' (payment due in 30 days), 'Net 15', or 'Due upon receipt'. Including a due date creates urgency. You can add this in the 'From' or 'To' sections as a note." },
            { title: "Use a Consistent Invoicing System", description: "Use sequential invoice numbers (e.g., 001, 002, 003) to make tracking easy for both you and your client. It also helps with bookkeeping and tax preparation." },
            { title: "Follow Up Professionally", description: "If an invoice is past due, send a polite follow-up email. Reference the invoice number and date. Sometimes invoices simply get misplaced, and a friendly reminder is all that's needed." },
        ]}
        faqs={[
            { question: "Is my invoice data saved anywhere?", answer: "No, this is a client-side tool. All the information you enter is processed directly in your browser and is never sent to our servers. If you close or refresh the page, your data will be cleared." },
            { question: "How do I save the invoice as a PDF?", answer: "After clicking the 'Print / Download PDF' button, your browser's print preview dialog will appear. In the 'Destination' or 'Printer' dropdown menu, select 'Save as PDF'. This will create a PDF file on your computer instead of sending it to a physical printer." },
            { question: "Can I add taxes or discounts?", answer: "This is a simple invoice generator. For taxes or discounts, you can add them as separate line items. For example, you could add a line item with a description like 'Sales Tax (8%)' and enter the calculated tax amount in the 'Rate' field, with quantity 1. For a discount, you can add a line item with a negative rate." },
            { question: "Can I add my logo to the invoice?", answer: "This basic generator does not support direct logo uploads. For a more customized invoice with a logo, you would typically use dedicated invoicing software or a more advanced template." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default InvoiceGenerator;
