import React, { useState, useEffect } from "react";
import NotifGroup from "../cards/NotifGroup";
import NotifSpan from "../texts/NotifSpan";
import Notification from "../links/Notification";
import LogList from "../LogList";
import LogRow from "../tables/LogRow";
import CustomBadge from "../badges/CustomBadge";
import SmallSpin from "../loading components/SmallSpin";
import { useLocation } from "react-router-dom";

export default function AppNotifications() {
  const { state } = useLocation();
  const id = state?.id;
  const [payment, setPayment] = useState([]);
  const [appLoad, setAppLoad] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/payment${id ? `/${id}` : ""}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) setPayment(data);
        else setPayment([data]);
        setAppLoad(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setAppLoad(true);
      });
  }, [id]);

  return (
    <div className="w-full md:px-20 p-4 bg-gray-200 dark:bg-gray-800">
      <div className="w-full md:px-20">
        <NotifGroup date="January 13th, 2025">
          <LogList>
            {appLoad ? (
              <div className="w-full h-40 py-20 dark:bg-gray-800 flex justify-center items-center">
                <SmallSpin size={50} />
              </div>
            ) : (
              payment.map((pay, i) => (
                <LogRow
                  key={i}
                  id={pay.cert_num}
                  date="2025.07.23"
                  name="John Doe"
                  amount={pay.amount_paid}
                  bttnText="View"
                  path="/customer/invoice"
                  badge={<CustomBadge text="On Time" color="green" />}
                />
              ))
            )}
          </LogList>
        </NotifGroup>
        {/* <NotifGroup date="January 9th, 2025">
                    <Notification content="You have paid for this month's payment.." to="/customer/invoice">
                        <NotifSpan text="This month's payment successful!" />
                    </Notification>
                    <Notification content="You have paid for this month's payment.." to="/customer/invoice">
                        <NotifSpan text="This month's payment successful!" />
                    </Notification>
                </NotifGroup> */}
      </div>
    </div>
  );
}
