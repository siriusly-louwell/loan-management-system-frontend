import { useDispatch, useSelector } from "react-redux";
import CloseBttn from "../buttons/CloseBttn";
import { toggleModal } from "../../services/redux/slices/uiSlice";
import PopAnimate from "../animations/popAnimate";

export default function CollectionReceipt({
  receiptNo = "10551",
  date = "",
  receivedFrom = "",
  address = "",
  tin = "",
  businessStyle = "",
  amount = "",
  amountWords = "",
  paymentType = "full",
  cashier = "",
}) {
  const dispatch = useDispatch();
  const { modals } = useSelector((state) => state.ui);

  return (
    modals.receipt && (
      <section className="w-screen h-screen top-0 left-0 right-0 z-40 fixed flex items-center justify-center bg-gray-200 bg-opacity-30 dark:bg-gray-800 dark:bg-opacity-30">
        <PopAnimate>
          <div className="bg-gray-700 px-5 py-3">
            <div className="flex justify-right mb-2">
              <CloseBttn
                trigger={() =>
                  dispatch(
                    toggleModal({ name: "receipt", value: modals.receipt })
                  )
                }
              />
            </div>
            <div className="w-full max-w-3xl border p-6 bg-white text-gray-900 rounded-md shadow">
              <div className="text-center mb-4">
                <h2 className="font-bold text-lg">RHEAN MOTOR CENTER, INC.</h2>
                <p className="text-sm">
                  Door No. 1-6 Jain Ventures Corporation, Santo Niño 8105 City
                  of Panabo, Davao del Norte
                </p>
                <p className="text-xs">VAT Reg. TIN: 420-602-813-00030</p>
              </div>

              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-md">COLLECTION RECEIPT</h3>
                <span className="text-sm text-gray-500">CUSTOMER’S COPY</span>
              </div>

              <div className="text-sm space-y-3">
                <p>
                  RECEIVED from{" "}
                  <span className="border-b border-gray-400 inline-block min-w-[200px]">
                    {tin}
                  </span>
                </p>
                <p>
                  with TIN{" "}
                  <span className="border-b border-gray-400 inline-block min-w-[200px]">
                    {receivedFrom}
                  </span>
                </p>
                <p>
                  and address at{" "}
                  <span className="border-b border-gray-400 inline-block min-w-[200px]">
                    {address}
                  </span>
                </p>
                <p>
                  style of{" "}
                  <span className="border-b border-gray-400 inline-block min-w-[200px]">
                    {businessStyle}
                  </span>
                </p>
                <p>
                  in partial/full payment of{" "}
                  <span className="border-b border-gray-400 inline-block min-w-[200px] capitalize">
                    {paymentType}
                  </span>
                </p>
                <p>
                  the sum of{" "}
                  <span className="border-b border-gray-400 inline-block min-w-[200px]">
                    {amountWords}
                  </span>
                </p>
                <p>
                  pesos (₱{" "}
                  <span className="border-b border-gray-400 inline-block min-w-[100px]">
                    {amount}
                  </span>
                  )
                </p>
              </div>

              <div className="flex justify-between items-center mt-6 text-sm">
                <p>
                  No.{" "}
                  <span className="font-semibold text-red-500">
                    {receiptNo}
                  </span>
                </p>
                <p>
                  Date:{" "}
                  <span className="border-b border-gray-400 inline-block min-w-[100px]">
                    {date}
                  </span>
                </p>
              </div>

              <div className="flex justify-end mt-6">
                <div className="text-center">
                  <p className="border-t border-gray-500 w-48 mx-auto">
                    {cashier || "Cashier / Authorized Representative"}
                  </p>
                </div>
              </div>

              <p className="text-[10px] text-right mt-4 italic text-gray-500">
                "THIS DOCUMENT IS NOT VALID FOR CLAIMING INPUT TAXES"
              </p>
            </div>
          </div>
        </PopAnimate>
      </section>
    )
  );
}
