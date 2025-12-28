import { useDispatch, useSelector } from "react-redux";
import CollectionReceipt from "../components/cards/CollectionReceipt";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Invoice from "../components/cards/Invoice";
import BttnwithIcon from "../components/buttons/BttnwithIcon";
import { Printer } from "lucide-react";
import {
  fetchPayment,
  getPaymentId,
} from "../services/redux/slices/paymentSlice";
import {
  fetchLoan,
  getLoanId,
} from "../services/redux/slices/applicationSlice";

export default function InvoicePage() {
  const dispatch = useDispatch();
  const { paymentID } = useSelector((state) => state.payment);
  const { loanID } = useSelector((state) => state.application);
  const componentRef = useRef();

  useEffect(() => {
    dispatch(getPaymentId());
    dispatch(getLoanId());
  }, []);

  useEffect(() => {
    if (loanID) dispatch(fetchLoan({ id: loanID, by: "id" }));
    if (paymentID) dispatch(fetchPayment({ id: paymentID, by: "id" }));
  }, [loanID, paymentID, dispatch]);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Invoice #12345",
  });

  return (
    <div className="max-w-[640px] w-full h-full px-4 sm:px-6 lg:px-10 mx-auto py-4 sm:py-10">
      <div className="bg-gray-100 dark:bg-gray-900 py-6 px-8 rounded-xl">
        <div className="flex justify-end mb-4">
          <BttnwithIcon text="Print Invoice" click={handlePrint}>
            <div className="mr-2">
              <Printer className="w-4 h-4" />
            </div>
          </BttnwithIcon>
        </div>
        <Invoice ref={componentRef} />
        <CollectionReceipt />
      </div>

      <style>
        {`
          @media print {
            body {
              -webkit-print-color-adjust: exact;
            }
            .print-title {
              display: none !important;
            }
            .rmci {
              display: block !important;
            }
          }
        `}
      </style>
    </div>
  );
}
