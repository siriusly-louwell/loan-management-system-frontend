import React from "react";
import NotifGroup from "../cards/NotifGroup";
import NotifSpan from "../texts/NotifSpan";
import Notification from "../links/Notification";
import LogList from "../LogList";
import LogRow from "../tables/LogRow";
import CustomBadge from "../badges/CustomBadge";

export default function AppNotifications() {
    return (
        <div class="w-full md:px-20 p-4 bg-gray-200 dark:bg-gray-800">
            <div class="w-full md:px-20">
                <NotifGroup date="January 13th, 2025">
                    <LogList>
                        <LogRow id="2025-JG64GJ" date="2025.07.23" name="John Doe" bttnText="View" path='/customer/invoice' badge={<CustomBadge text="Paid" color="blue" />} />
                    </LogList>
                </NotifGroup>
                <NotifGroup date="January 12th, 2025">
                    <LogList>
                        <LogRow id="2025WO83B" date="2025.07.23" name="John Doe" bttnText="View" path='/customer/invoice' badge={<CustomBadge text="Paid" color="blue" />} />
                        <LogRow id="2025WO83B" date="2025.07.23" name="John Doe" bttnText="View" path='/customer/invoice' badge={<CustomBadge text="Paid" color="blue" />} />
                        <LogRow id="2025WO83B" date="2025.07.23" name="John Doe" bttnText="View" path='/customer/invoice' badge={<CustomBadge text="Paid" color="blue" />} />
                        <LogRow id="2025WO83B" date="2025.07.23" name="John Doe" bttnText="View" path='/customer/invoice' badge={<CustomBadge text="Paid" color="blue" />} />
                    </LogList>
                </NotifGroup>
                <NotifGroup date="January 9th, 2025">
                    <LogList>
                        <LogRow id="2025WO83B" date="2025.07.23" name="John Doe" bttnText="View" path='/customer/invoice' badge={<CustomBadge text="Paid" color="blue" />} />
                        <LogRow id="2025WO83B" date="2025.07.23" name="John Doe" bttnText="View" path='/customer/invoice' badge={<CustomBadge text="Paid" color="blue" />} />
                    </LogList>
                    {/* <Notification content="You have paid for this month's payment.." to="/customer/invoice">
                        <NotifSpan text="This month's payment successful!" />
                    </Notification>
                    <Notification content="You have paid for this month's payment.." to="/customer/invoice">
                        <NotifSpan text="This month's payment successful!" />
                    </Notification> */}
                </NotifGroup>
                <NotifGroup date="January 5th, 2025">
                    <LogList>
                        <LogRow id="2025WO83B" date="2025.07.23" name="John Doe" bttnText="View" path='/customer/invoice' badge={<CustomBadge text="Paid" color="blue" />} />
                        <LogRow id="2025WO83B" date="2025.07.23" name="John Doe" bttnText="View" path='/customer/invoice' badge={<CustomBadge text="Paid" color="blue" />} />
                        <LogRow id="2025WO83B" date="2025.07.23" name="John Doe" bttnText="View" path='/customer/invoice' badge={<CustomBadge text="Paid" color="blue" />} />
                    </LogList>
                </NotifGroup>
            </div>
        </div>
    );
}