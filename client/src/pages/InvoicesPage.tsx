import { useEffect, useState } from "react"
import { Button } from "../components/ui/Button"
import { Plus, FileText } from "lucide-react"
import { Popup } from "../components/Popup"
import { AddInvoicePopup } from "../components/popups/invoices/AddInvoicePopup"
import { useAppDispatch } from "../app/hooks"
import { getInvoices } from "../app/features/invoice/invoiceThunks"
import { useInvoice } from "../hooks/useInvoice"
import { InvoicesTable } from "../components/tables/InvoicesTable"
import { getFreelanceProjects } from "../app/features/freelancing/freelancingThunks"
import { useFreelancing } from "../hooks/useFreelancing"

const InvoicesPage = () => {
  const [addPopupIsOpen, setAddPopupIsOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()


  const { invoices, isLoading } = useInvoice()
  const { freelanceProjects , isLoading : freelanceIsLoading} = useFreelancing();

  useEffect(() => {
    dispatch(getInvoices())
    dispatch(getFreelanceProjects())
  }, [dispatch])




  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="space-y-1">
          <h3 className="font-bold text-3xl">Invoices</h3>
          <p className="text-sm text-gray-500">
            Generate, print and track invoices
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button size="md" onClick={() => setAddPopupIsOpen(true)} disabled={freelanceIsLoading}>
            New Invoice
            <Plus size={13} />
          </Button>
        </div>
      </div>

      {(!freelanceIsLoading && Array.isArray(freelanceProjects)) && 
      <Popup isOpen={addPopupIsOpen} onClose={() => setAddPopupIsOpen(false)} size="large">
        <AddInvoicePopup closePopup={() => setAddPopupIsOpen(false)} freelanceProjects={freelanceProjects}/>
      </Popup>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading invoices...</div>
        ) : !invoices || invoices.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <p className="text-gray-600 font-medium">No invoices found</p>
            <p className="text-sm text-gray-400">Get started by creating your first invoice.</p>
          </div>
        ) : <InvoicesTable invoices={invoices} />}
      </div>
    </div>
  )
}

export default InvoicesPage