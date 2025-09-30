import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoanList from "../components/LoanList";
import TrackList from "../components/TrackList";
import CustomBttn from "../components/buttons/CustomBttn";
import Button from "../components/buttons/Button";
import BasicBttn from "../components/buttons/BasicBttn";
import SmallSpin from "../components/loading components/SmallSpin";
import AssignCI from "../components/AssignCI";
import DeclineApplicant from "../components/DeclineApplicant";
import Alert from "../components/Alert";
import Spinner from "../components/loading components/Spinner";
import ProductCard from "../components/cards/ProductCard";
import CardSkeleton from "../components/loading components/CardSkeleton";
import Eligibility from "../components/modals/Eligibility";
import EmptySearch from "../components/empty states/EmptySearch";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoan,
  getLoanId,
  updateStatus,
} from "../services/redux/slices/applicationSlice";
import {
  setAlert,
  setLoading,
  toggleModal,
} from "../services/redux/slices/uiSlice";
import { LoanEntity } from "../services/entities/Loan";
import { fetchUnits } from "../services/redux/slices/unitSlice";
import { UnitEntities } from "../services/entities/Unit";
import Dialog from "../components/modals/Dialog";
import { BarChart2, CheckCircle2, FileText, XCircle } from "lucide-react";
import { UserEntity } from "../services/entities/User";

export default function LoanInfo({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [approval, setApproval] = useState();
  const units = useSelector(UnitEntities);
  const loan = useSelector(LoanEntity);
  const { role } = useSelector(UserEntity);
  const { unitsLoading } = useSelector((state) => state.unit);
  const { modals } = useSelector((state) => state.ui);
  const { loanID, loanLoading } = useSelector((state) => state.application);

  useEffect(() => {
    dispatch(getLoanId());
  }, []);

  useEffect(() => {
    if (loanID) dispatch(fetchLoan({ id: loanID, by: "id" }));
  }, [loanID, dispatch]);

  useEffect(() => {
    if (loan.ndi && (loan.status === "denied" || loan.status === "declined"))
      dispatch(fetchUnits({ ndi: loan.ndi }));
  }, [loan.ndi, loan.status, dispatch]);

  async function approveApplicant(event) {
    event.preventDefault();
    dispatch(setLoading({ isActive: true, text: "Saving data..." }));
    dispatch(toggleModal({ name: "approvalApp", value: modals.approvalApp }));

    try {
      const response = await dispatch(
        updateStatus({ apply_status: approval.text, id: loan.id })
      ).unwrap();

      dispatch(setLoading({ isActive: false }));
      dispatch(setAlert({ message: response.message, type: response.type }));
      if (response.type === "success")
        dispatch(fetchLoan({ id: loan.id, by: "id" }));
    } catch (error) {
      console.error("Error: ", error);
      dispatch(setLoading({ isActive: false }));
      dispatch(
        setAlert({
          message: "Something went wrong. Please try again",
          type: "error",
        })
      );
    }
  }

  function displayRecommend() {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 px-3 py-1 mx-5 mt-3 rounded-lg">
        <h2 className="mt-5 pl-5 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          {units.length > 0 ? "Recommendations" : "No Recommendations"}
        </h2>
        <section className="my-4 px-5 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-4 xl:grid-cols-4">
          {unitsLoading ? (
            <CardSkeleton />
          ) : (
            units.map((motor) => <ProductCard key={motor.id} unit={motor} />)
          )}
        </section>
        {!unitsLoading && units.length === 0 && (
          <EmptySearch
            label="No affordable units"
            context="Applicant is not eligible to take any loan"
          />
        )}
      </div>
    );
  }

  return (
    <section className="bg-gray-200 py-8 antialiased dark:bg-gray-900 md:py-16">
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
                  img={trans.motorcycle.file_path}
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
                {children}
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
                  classname="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 focus:ring-2 focus:ring-rose-400 transition-colors"
                />
                {(loan.status === "evaluated" ||
                  loan.status === "approved" ||
                  loan.status === "declined") && (
                  <>
                    <CustomBttn
                      text="View Report"
                      icon={<FileText className="w-4 h-4 mr-2" />}
                      bttnType="button"
                      onclick={() => navigate(`/${role}/review`)}
                      classname="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-colors"
                    />
                    {role === "admin" && (
                      <section className="flex space-x-2">
                        <CustomBttn
                          text="Approve Application"
                          icon={<CheckCircle2 className="w-4 h-4 mr-2" />}
                          onclick={() => {
                            setApproval({
                              label: "Do you want to approve this application?",
                              text: "approved",
                            });
                            dispatch(
                              toggleModal({
                                name: "approvalApp",
                                value: modals.approvalApp,
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {(loan.status === "declined" || loan.status === "denied") &&
        displayRecommend()}

      <Eligibility loan={loan} setAlert={setAlert} />
      <DeclineApplicant
        id={loan.id}
        record={loan.record_id}
        name={`${loan.fullName}`}
      />

      <AssignCI />

      <Dialog
        text="Do you want to approve this application?"
        modalName="approvalApp">
        <section className="flex space-x-4 items-center justify-center">
          <CustomBttn
            text="Yes"
            onclick={approveApplicant}
            classname="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          />
          <BasicBttn
            text="No, cancel"
            click={() =>
              dispatch(
                toggleModal({ name: "approvalApp", value: modals.approvalApp })
              )
            }
          />
        </section>
      </Dialog>

      <Alert id="approvalApp" text={alert.text} icon="warn">
        <CustomBttn
          text="Yes"
          onclick={approveApplicant}
          classname="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
        />
        <BasicBttn
          text="No, cancel"
          onclick={() =>
            (document.getElementById("approvalApp").style.display = "none")
          }
        />
      </Alert>
      <Spinner id="approve_app" />
      <Alert id="approve-app" text={alert.text} icon={alert.icon}>
        {alert.icon === "done" ? (
          <Button
            text="Ok"
            type="button"
            onclick={() => navigate("/admin/accounts")}
          />
        ) : (
          <Button
            text="Ok"
            type="button"
            onclick={() =>
              (document.getElementById("approve-app").style.display = "none")
            }
          />
        )}
      </Alert>
    </section>
  );
}
