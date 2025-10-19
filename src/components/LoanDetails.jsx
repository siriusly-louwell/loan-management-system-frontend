import { useDispatch, useSelector } from "react-redux";
import { LoanEntity } from "../services/entities/Loan";
import LoanList from "./LoanList";
import SmallSpin from "./loading components/SmallSpin";
import TrackList from "./TrackList";
import CustomBttn from "./buttons/CustomBttn";
import { BarChart2, CheckCircle2, FileText, XCircle } from "lucide-react";
import { toggleModal } from "../services/redux/slices/uiSlice";
import { useNavigate } from "react-router-dom";
import { UserEntity } from "../services/entities/User";
import SubtleIconBttn from "./buttons/SubtleIconBttn";

export default function LoanDetails({ setApproval }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin, role } = useSelector(UserEntity);
  const loan = useSelector(LoanEntity);
  const { modals } = useSelector((state) => state.ui);
  const { loanLoading } = useSelector((state) => state.application);
  const statusCondition =
    loan.status === "evaluated" ||
    loan.status === "approved" ||
    loan.status === "declined";

  return (
    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <div className="flex justify-between w-full">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Track the loan {loan.record_id}
        </h2>
      </div>

      <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
        {loanLoading ? (
          <div className="w-full h-fit bg-gray-100 dark:bg-gray-800 divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-600 lg:max-w-xl xl:max-w-2xl">
            <LoanList load={loanLoading} />
            <div className="space-y-4 bg-white p-6 dark:bg-gray-800">
              <div className="space-y-2">
                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 dark:text-gray-300">
                    Res. Certificate number
                  </dt>
                  <SmallSpin size={20} />
                </dl>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 dark:text-gray-300">
                    Issued at
                  </dt>
                  <SmallSpin size={20} />
                </dl>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 dark:text-gray-300">
                    Issued on
                  </dt>
                  <SmallSpin size={20} />
                </dl>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 dark:text-gray-300">
                    Amount Paid (Total Downpayment)
                  </dt>
                  <SmallSpin size={20} />
                </dl>
              </div>

              <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-600">
                <dt className="text-lg font-bold text-gray-900 dark:text-white">
                  Overall price
                </dt>
                <dd className="w-10 h-5 rounded-lg bg-gray-200 dark:bg-gray-600 animate-pulse"></dd>
              </dl>
            </div>
          </div>
        ) : (
          <div className="w-full h-fit bg-gray-100 dark:bg-gray-800 divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-600 lg:max-w-xl xl:max-w-2xl">
            {loan.transactions.map((trans) => (
              <LoanList
                key={trans.id}
                downpayment={trans.downpayment}
                color={trans.color}
                price={trans.motorcycle.price}
                units={trans.quantity}
                img={loan.unitImage}
                name={trans.motorcycle.name}
              />
            ))}

            <div className="space-y-4 bg-white p-6 dark:bg-gray-800">
              <div className="space-y-2">
                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 dark:text-gray-300">
                    Res. Certificate number
                  </dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    - - -
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 dark:text-gray-300">
                    Issued at
                  </dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    - - -
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 dark:text-gray-300">
                    Issued on
                  </dt>
                  <dd className="font-medium text-gray-900 dark:text-white">
                    - - -
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="font-normal text-gray-500 dark:text-gray-300">
                    Amount Paid (Downpayment)
                  </dt>
                  <dd className="font-medium text-green-500 dark:text-green-500">
                    {loan.downpayment}
                  </dd>
                </dl>
              </div>

              <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-600">
                <dt className="text-lg font-bold text-gray-900 dark:text-white">
                  Overall price
                </dt>
                <dd className="text-lg font-bold text-gray-900 dark:text-white">
                  {loan.price}
                </dd>
              </dl>
            </div>
          </div>
        )}

        <div className="mt-6 grow sm:mt-8 lg:mt-0">
          <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 sm:sticky top-0 shadow-sm dark:border-gray-700 dark:bg-gray-700">
            <div className="flex justify-between space-x-5">
              <h3 className="text-xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">
                Loan history
              </h3>
            </div>

            <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-600">
              <TrackList
                label="Loan Submission"
                sublabel="Loan application was successful"
                status={loan.trackStatus("submit")}
              />
              <TrackList
                label={loan.statusLabel("acceptance", 0)}
                sublabel={loan.statusLabel("acceptance", 1)}
                status={loan.trackStatus("accept")}
                extra={loan.status === "denied" && <SubtleIconBttn />}
              />
              <TrackList
                label="Credit Investigation"
                sublabel="Applicant has been interviewed by the assigned Credit Investigator"
                status={loan.trackStatus("investigation")}
              />
              <TrackList
                label={loan.statusLabel("approval", 0)}
                sublabel={loan.statusLabel("approval", 1)}
                status={loan.trackStatus("approve")}
                extra={loan.status === "declined" && <SubtleIconBttn />}
              />
              <TrackList
                label="Initial Payment"
                sublabel="The loan application has been successful"
                status={loan.trackStatus("payment")}
              />
              <TrackList
                label="Paid!"
                sublabel="The loan has been fully paid"
                status={loan.trackStatus("paid")}
              />
            </ol>

            <div className="gap-4 grid grid-cols-1">
              <CustomBttn
                text="View Results"
                icon={<BarChart2 className="w-4 h-4 mr-2" />}
                bttnType="button"
                onclick={() =>
                  dispatch(
                    toggleModal({
                      name: "eligibility",
                      value: modals.eligibility,
                    })
                  )
                }
                classname="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 focus:ring-2 focus:ring-rose-400 transition-colors"
              />
              {statusCondition && (
                <>
                  <CustomBttn
                    text="View Report"
                    icon={<FileText className="w-4 h-4 mr-2" />}
                    bttnType="button"
                    onclick={() => navigate(`/${role}/review`)}
                    classname="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-colors"
                  />
                  {isAdmin && (
                    <section className="flex space-x-2">
                      <CustomBttn
                        text="Approve Application"
                        icon={<CheckCircle2 className="w-4 h-4 mr-2" />}
                        onclick={() => {
                          // setApproval({
                          //   label: "Do you want to approve this application?",
                          //   text: "approved",
                          // });
                          dispatch(
                            toggleModal({
                              name: "approveLoan",
                              value: modals.approveLoan,
                            })
                          );
                        }}
                        classname="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-400 transition-colors"
                      />
                      <CustomBttn
                        text="Decline Application"
                        icon={<XCircle className="w-4 h-4 mr-2" />}
                        onclick={() => {
                          setApproval({
                            label: "Do you want to decline this application?",
                            text: "declined",
                          });
                          dispatch(
                            toggleModal({
                              name: "approvalApp",
                              value: modals.approvalApp,
                            })
                          );
                        }}
                        classname="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400 transition-colors"
                      />
                    </section>
                  )}
                  {role === "customer" && (
                    <CustomBttn
                      text="Cancel Application"
                      icon={<XCircle className="w-4 h-4 mr-2" />}
                      onclick={() => {
                        setApproval({
                          label:
                            "Are you sure you want to cancel this application?",
                          text: "canceled",
                        });
                        dispatch(
                          toggleModal({
                            name: "approvalApp",
                            value: modals.approvalApp,
                          })
                        );
                      }}
                      classname="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400 transition-colors"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
