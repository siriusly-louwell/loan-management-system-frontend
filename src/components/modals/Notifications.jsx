import React from "react";
import NotifGroup from "../cards/NotifGroup";
import NotifSpan from "../texts/NotifSpan";
import Notification from "../links/Notification";

export default function Notifications() {
  return (
    <div className="w-full p-4 bg-white dark:bg-gray-800">
      <NotifGroup date="January 13th, 2025">
        <Notification content="I wanted to share a webinar zeroheight.">
          <NotifSpan text="John Doe" /> and <NotifSpan text="Steve Jobs" /> are
          late for payment
        </Notification>
      </NotifGroup>
      <NotifGroup date="January 12th, 2025">
        <Notification content="I wanted to share a webinar zeroheight.">
          <NotifSpan text="John Doe" /> and <NotifSpan text="Steve Jobs" /> are
          late for payment
        </Notification>
        <Notification content="I wanted to share a webinar zeroheight.">
          <NotifSpan text="John Doe" /> and <NotifSpan text="Steve Jobs" /> are
          late for payment
        </Notification>
        <Notification content="I wanted to share a webinar zeroheight.">
          <NotifSpan text="John Doe" /> and <NotifSpan text="Steve Jobs" /> are
          late for payment
        </Notification>
        <Notification content="I wanted to share a webinar zeroheight.">
          <NotifSpan text="John Doe" /> and <NotifSpan text="Steve Jobs" /> are
          late for payment
        </Notification>
      </NotifGroup>
      <NotifGroup date="January 9th, 2025">
        <Notification content="I wanted to share a webinar zeroheight.">
          <NotifSpan text="John Doe" /> and <NotifSpan text="Steve Jobs" /> are
          late for payment
        </Notification>
        <Notification content="I wanted to share a webinar zeroheight.">
          <NotifSpan text="John Doe" /> and <NotifSpan text="Steve Jobs" /> are
          late for payment
        </Notification>
      </NotifGroup>
      <NotifGroup date="January 5th, 2025">
        <Notification content="I wanted to share a webinar zeroheight.">
          <NotifSpan text="John Doe" /> and <NotifSpan text="Steve Jobs" /> are
          late for payment
        </Notification>
        <Notification content="I wanted to share a webinar zeroheight.">
          <NotifSpan text="John Doe" /> and <NotifSpan text="Steve Jobs" /> are
          late for payment
        </Notification>
        <Notification content="I wanted to share a webinar zeroheight.">
          <NotifSpan text="John Doe" /> and <NotifSpan text="Steve Jobs" /> are
          late for payment
        </Notification>
      </NotifGroup>
    </div>
  );
}
