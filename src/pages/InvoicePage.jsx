import { useDispatch, useSelector } from "react-redux";
import CollectionReceipt from "../components/cards/CollectionReceipt";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  fetchPayment,
  getPaymentId,
} from "../services/redux/slices/paymentSlice";
import {
  fetchLoan,
  getLoanId,
} from "../services/redux/slices/applicationSlice";
import Invoice from "../components/cards/Invoice";
import BttnwithIcon from "../components/buttons/BttnwithIcon";
import { Printer } from "lucide-react";

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
    <div className="max-w-full min-h-screen px-4 sm:px-6 lg:px-28 mx-auto py-4 bg-gray-100 dark:bg-gray-900 sm:py-10">
      <div className="flex justify-end mb-4">
        <BttnwithIcon text="Print Invoice" click={handlePrint}>
          <div className="mr-2">
            <Printer className="w-4 h-4" />
          </div>
        </BttnwithIcon>
      </div>
      <Invoice ref={componentRef} />
      <CollectionReceipt />

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
