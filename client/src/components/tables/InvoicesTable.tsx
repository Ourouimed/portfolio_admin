import { Eye } from "lucide-react"

export const InvoicesTable = ({ invoices }: any) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase bg-gray-50/50">
                        <th className="py-3 px-4">Invoice ID</th>
                        <th className="py-3 px-4">Project ID</th>
                        <th className="py-3 px-4">Issue Date</th>
                        <th className="py-3 px-4">Due Date</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Total</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                    {invoices.map((invoice: any) => {
                        const invoiceId = invoice._id?.toString() || invoice._id
                        const totalAmount = invoice.total || 0

                        return (
                            <tr key={invoiceId} className="hover:bg-gray-50/80 transition-colors">
                                <td className="py-3 px-4 font-medium text-gray-900">
                                    #{invoiceId.slice(-6).toUpperCase()}
                                </td>
                                <td className="py-3 px-4 text-gray-600">
                                    {invoice.project?.toString().slice(-6).toUpperCase() || 'N/A'}
                                </td>
                                <td className="py-3 px-4 text-gray-600">
                                    {new Date(invoice.issue_date).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4 text-gray-600">
                                    {new Date(invoice.due_date).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4 text-gray-600">
                                    <span className={`py-1 px-3 text-xs font-bold rounded-full ${
                                        invoice.status === "Paid" ? "bg-green-100 text-green-500" : 
                                        invoice.status === "Partial" ? "bg-yellow-100 text-yellow-500" : "bg-gray-100"}`}>
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 font-semibold text-gray-900">
                                    {totalAmount.toFixed(2)}{invoice.currency}
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <a
                                        href={`/invoices/${invoiceId}`}
                                        className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-900 font-medium text-xs bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-md transition-colors"
                                    >
                                        <Eye size={14} />
                                        View
                                    </a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}