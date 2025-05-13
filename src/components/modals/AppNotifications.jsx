import React from "react";
import NotifGroup from "../cards/NotifGroup";
import NotifSpan from "../texts/NotifSpan";
import Notification from "../links/Notification";

export default function AppNotifications() {
    return (
        <div class="w-full md:px-20 p-4 bg-white dark:bg-gray-800">
            <div class="w-full md:px-20">
                <NotifGroup date="January 13th, 2025">
                    <Notification content="You have paid for this month's payment.." to="/applicant/invoice">
                        <NotifSpan text="This month's payment successful!" />
                    </Notification>
                </NotifGroup>
                <NotifGroup date="January 12th, 2025">
                    <Notification content="You have paid for this month's payment.." to="/applicant/invoice">
                        <NotifSpan text="This month's payment successful!" />
                    </Notification>
                    <Notification content="You have paid for this month's payment.." to="/applicant/invoice">
                        <NotifSpan text="This month's payment successful!" />
                    </Notification>
                    <Notification content="You have paid for this month's payment.." to="/applicant/invoice">
                        <NotifSpan text="This month's payment successful!" />
                    </Notification>
                    <Notification content="You have paid for this month's payment.." to="/applicant/invoice">
                        <NotifSpan text="This month's payment successful!" />
                    </Notification>
                </NotifGroup>
                <NotifGroup date="January 9th, 2025">
                    <Notification content="You have paid for this month's payment.." to="/applicant/invoice">
                        <NotifSpan text="This month's payment successful!" />
                    </Notification>
                    <Notification content="You have paid for this month's payment.." to="/applicant/invoice">
                        <NotifSpan text="This month's payment successful!" />
                    </Notification>
                </NotifGroup>
                <NotifGroup date="January 5th, 2025">
                    <Notification content="You have paid for this month's payment.." to="/applicant/invoice">
                        <NotifSpan text="This month's payment successful!" />
                    </Notification>
                    <Notification content="You have paid for this month's payment.." to="/applicant/invoice">
                        <NotifSpan text="This month's payment successful!" />
                    </Notification>
                    <Notification content="You have paid for this month's payment.." to="/applicant/invoice">
                        <NotifSpan text="This month's payment successful!" />
                    </Notification>
                </NotifGroup>
            </div>
        </div>
    );
}