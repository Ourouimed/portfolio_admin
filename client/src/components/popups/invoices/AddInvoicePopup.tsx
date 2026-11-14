import { useMemo, useState, type ChangeEvent } from "react"
import { Select } from "../../ui/Select";
import { useToast } from "../../../hooks/useToast";
import { useAppDispatch } from "../../../app/hooks";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import type { Invoice, InvoiceFormErrors } from "../../../app/features/invoice/invoiceTypes";
import { addInvoice } from "../../../app/features/invoice/invoiceThunks";
import { Loader2 } from "lucide-react";
import { useInvoice } from "../../../hooks/useInvoice";

export const AddInvoicePopup = ({ closePopup, freelanceProjects }: any) => {

    const dispatch = useAppDispatch();
    const toast = useToast();
    const { isLoading: invoiceIsLoading } = useInvoice()

    const [errors, setErrors] = useState<InvoiceFormErrors>({})
    const [invoiceData, setInvoiceData] = useState<Invoice>({
        project: null,
        title: "",
        currency: "MAD",
        issue_date: new Date().toISOString().slice(0, 10) || "",
        due_date: (() => {
            const date = new Date();
            date.setDate(date.getDate() + 10);
            return date.toISOString().slice(0, 10) || "";
        })(),
        items: [
            {
                description: "",
                quantity: 1,
                price: 0,
            }
        ],
    });



    const formatedProjects = useMemo(() => {
        return ["None", ...freelanceProjects.map((p: any) => ({ value: p._id, label: p.project_name }))]
    }, freelanceProjects)


    const currencies = [
        { value: "MAD", label: "MAD" }, { value: "€", label: "EURO" }, { value: "$", label: "USD" }
    ]

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setInvoiceData((prev) => ({ ...prev, [id]: value }));
    };

    const handleItemChange = (index: number, field: string, value: any) => {
        setInvoiceData((prev) => {
            const newItems = [...prev.items];
            newItems[index] = { ...newItems[index], [field]: value };
            return { ...prev, items: newItems };
        });
    };

    const addItemRow = () => {
        setInvoiceData((prev) => ({
            ...prev,
            items: [...prev.items, { description: "", quantity: 1, price: 0 }]
        }));
    };

    const removeItemRow = (index: number) => {
        if (invoiceData.items.length === 1) return;
        setInvoiceData((prev) => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    const grandTotal = useMemo(() => {
        return invoiceData.items.reduce((acc, item) => {
            const qty = Number(item.quantity) || 0;
            const price = Number(item.price) || 0;
            return acc + (qty * price);
        }, 0);
    }, [invoiceData.items]);


    const validate = (): boolean => {
        const tempErrors: InvoiceFormErrors = {};
        // Invoice title
        if (!invoiceData.title.trim())
            tempErrors.title = "Invoice title is required";

        // Invoice Dates validation
        if (invoiceData.issue_date) {
            const selectedDate = new Date(invoiceData.issue_date);
            const now = new Date();

            if (selectedDate.getDate() < now.getDate()) {
                tempErrors.issue_date = "Invoice issue date must be in the future";
            }
        } else {
            tempErrors.issue_date = "Invoice issue date is required";
        }

        if (invoiceData.due_date) {
            const startDate = new Date(invoiceData.issue_date);
            const selectedDate = new Date(invoiceData.due_date);
            const now = new Date();

            if (selectedDate.getDate() < now.getDate()) {
                tempErrors.due_date = "Invoice due date must be in the future";
            }

            if (selectedDate.getDate() < startDate.getDate()) {
                tempErrors.due_date = "Invoice due date cannot be before issue date";
            }

        } else {
            tempErrors.due_date = "Freelance Project due date is required";
        }


        // Invoice items validation
        if (invoiceData.items.length === 0) {
            tempErrors.items ??= {
                error: "",
                children: []
            };

            tempErrors.items.error = "You must add at least one item to invoice";
        }

        else {
            let itemsErrors: any = []
            invoiceData.items.forEach((item, index) => {
                if (!item.description.trim()) {
                    itemsErrors.push({
                        index,
                        error: "Item description is required"
                    });
                }


                if (item.price < 0) {
                    itemsErrors.push({
                        index,
                        error: "Item price cannot be negatif"
                    });
                }


                if (item.quantity <= 0) {
                    itemsErrors.push({
                        index,
                        error: "Item quanity cannot be null"
                    });
                }
            })


            if (itemsErrors.length > 0) {
                tempErrors.items ??= {
                    error: "",
                    children: []
                };

                tempErrors.items.children = itemsErrors;
            }
        }

        // Currency validation
        const currKeys = currencies.map(c => c.value)
        if (!currKeys.includes(invoiceData.currency)) {
            tempErrors.currency = `${invoiceData.currency} not supported`
        }




        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    }

    const handleAddInvoice = async () => {
        if (validate()) {
            try {
                await dispatch(addInvoice(invoiceData)).unwrap();
                toast.success("Invoice added successfully");
                closePopup();
            } catch (err: any) {
                toast.error(err || "Failed to add invoice");
            }
        }
    }

    return (
        <div className="space-y-4">
            {/* Invoice Title */}
            <div className="space-y-2">
                <label htmlFor="title" className="block font-semibold text-sm">
                    Title
                </label>
                <Input id="title" value={invoiceData.title ?? ""} onChange={handleChange} placeholder="Invoice title here" />
                {errors.title && (
                    <p className="text-red-500 text-[10px]">{errors.title}</p>
                )}
            </div>


            {/* Project Selection */}
            <div className="space-y-2">
                <label htmlFor="project" className="block font-semibold text-sm">
                    Project
                </label>
                <Select
                    value={invoiceData.project ?? ""}
                    options={formatedProjects}
                    onChange={(e: any) =>
                        setInvoiceData((p: any) => ({ ...p, project: e.target.value }))
                    }
                />
            </div>


            {/* Project Currency */}
            <div className="space-y-2">
                <label htmlFor="currency" className="block font-semibold text-sm">
                    Currency
                </label>
                <Select
                    value={invoiceData.currency ?? ""}
                    options={currencies}
                    onChange={(e: any) =>
                        setInvoiceData((p: any) => ({ ...p, currency: e.target.value }))
                    }
                />
                {errors.currency && (
                    <p className="text-red-500 text-[10px]">{errors.currency}</p>
                )}
            </div>

            {/* Dates row */}
            <div className="flex items-center gap-2">
                <div className="space-y-2 w-full">
                    <label htmlFor="issue_date" className="block font-semibold text-sm">
                        Issue Date <span className="text-red-500">*</span>
                    </label>
                    <Input type="date" value={invoiceData.issue_date ?? ""} onChange={handleChange} id="issue_date" />
                    {errors.issue_date && (
                        <p className="text-red-500 text-[10px]">{errors.issue_date}</p>
                    )}
                </div>

                <div className="space-y-2 w-full">
                    <label htmlFor="due_date" className="block font-semibold text-sm">
                        Due Date <span className="text-red-500">*</span>
                    </label>
                    <Input type="date" value={invoiceData.due_date ?? ""} onChange={handleChange} id="due_date" />
                    {errors.due_date && (
                        <p className="text-red-500 text-[10px]">{errors.due_date}</p>
                    )}
                </div>
            </div>

            {/* Invoice Line Items Section */}
            <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-sm">Line Items</h3>
                    <Button
                        type="button"
                        onClick={addItemRow}
                        size="sm"
                    >
                        + Add Item
                    </Button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {invoiceData.items.map((item, index) => (
                        <div key={index} className="p-4 border border-gray-300 rounded-md space-y-2">
                            <div className="flex items-end gap-2 ">
                                <div className="flex-1 space-y-1">
                                    <label className="block font-semibold text-sm">Description</label>
                                    <Input
                                        type="text"
                                        value={item.description}
                                        onChange={(e) => handleItemChange(index, "description", e.target.value)}
                                        placeholder="Service or product description"
                                    />
                                </div>

                                <div className="w-20 space-y-1">
                                    <label className="text-xs text-gray-500">Qty</label>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(index, "quantity", Number(e.target.value))}
                                    />
                                </div>

                                <div className="w-24 space-y-1">
                                    <label className="text-xs text-gray-500">Price ({invoiceData?.currency || "MAD"})</label>
                                    <Input
                                        type="number"
                                        min="0"
                                        value={item.price}
                                        onChange={(e) => handleItemChange(index, "price", Number(e.target.value))}
                                    />
                                </div>

                                {invoiceData.items.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeItemRow(index)}
                                        className="text-red-500 hover:text-red-700 p-2 text-sm cursor-pointer"
                                        title="Remove Item"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            {errors?.items?.children.find(item => item.index === index)?.error && (
                                <p className="text-red-500 text-[10px]">
                                    {errors.items.children.find(item => item.index === index)?.error}
                                </p>
                            )}

                        </div>
                    ))}
                    {errors?.items?.error && (
                        <p className="text-red-500 text-[10px]">{errors?.items?.error}</p>
                    )}
                </div>
            </div>

            {/* Grand Total Summary */}
            <div className="flex justify-between items-center border-t border-gray-300 pt-3 font-bold text-base">
                <span>Total Amount:</span>
                <span>{grandTotal.toFixed(2)}{invoiceData?.currency || "N/A"}</span>
            </div>

            {/* Actions Footer */}
            <div className="flex justify-end gap-2 pt-2">
                <Button
                    variant="outline"
                    onClick={closePopup}
                >
                    Cancel
                </Button>
                <Button
                    disabled={invoiceIsLoading}
                    onClick={handleAddInvoice}
                >
                    {invoiceIsLoading ? <Loader2 className="animate-spin" /> : "Save Project"}
                </Button>
            </div>
        </div>
    );
};