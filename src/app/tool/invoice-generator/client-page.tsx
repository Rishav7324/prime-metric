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
        aboutContent="The Invoice Generator helps freelancers, small businesses, and contractors create professional invoices quickly and easily. Fill in your details, add line items for your products or services, and generate a printable invoice."
        useCases={[
            { title: "Freelancers", description: "Bill clients for your services with a clean, professional invoice." },
            { title: "Small Businesses", description: "Create invoices for products sold or services rendered." },
            { title: "Contractors", description: "Provide detailed invoices for your work, including parts and labor." },
        ]}
        tips={[
            { title: "Be Detailed", description: "Clearly describe each line item so your client knows exactly what they are paying for." },
            { title: "Include Payment Terms", description: "Add a note about your payment terms (e.g., 'Due upon receipt', 'Net 30') in the 'From' or 'To' section." },
            { title: "Save a Copy", description: "Always save a copy of the invoice for your own records before sending it to the client." },
        ]}
        faqs={[
            { question: "Is this invoice generator free to use?", answer: "Yes, this tool is completely free to use." },
            { question: "Is my data saved?", answer: "No, all information is processed in your browser and is not saved on our servers. If you refresh the page, the data will be gone." },
            { question: "How do I download the invoice as a PDF?", answer: "When you click the 'Print / Download PDF' button, your browser's print dialog will open. From there, you can choose to 'Save as PDF' instead of printing to a physical printer." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default InvoiceGenerator;

    