import React from "react";
import PfpLabel from "../components/PfpLabel";
import CustomBttn from "../components/buttons/CustomBttn";
import Edit from "../assets/icons/Edit";
import LogRow from "../components/tables/LogRow";
import Preorder from "../components/badges/Preorder";
import Cancelled from "../components/badges/Cancelled";
import Confirmed from "../components/badges/Confirmed";
import ProfileCard from "../components/cards/ProfileCard";
import BigCart from "../assets/icons/BigCart";
import SmallUpArrow from "../assets/icons/SmallUpArrow";
import BigStar from "../assets/icons/BigStar";
import BigHeart from "../assets/icons/BigHeart";
import BigReturn from "../assets/icons/BigReturn";
import { useSelector } from "react-redux";

export default function Profile() {
  const { loan, loanLoading } = useSelector((state) => state.application);

  return (
    !loanLoading && (
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-8">
        <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl md:mb-6">
            Profile Information
          </h2>
          <div className="grid grid-cols-2 gap-6 border-b border-t border-gray-200 py-4 dark:border-gray-700 md:py-8 lg:grid-cols-4 xl:gap-16">
            <ProfileCard
              label="Loans made"
              amount="25"
              text="20 last 3 months"
              icon={<BigCart />}
              arrow={<SmallUpArrow />}
              percent="10.3%"
            />
            <ProfileCard
              label="Credit score"
              amount="5"
              text="14 last 3 months"
              icon={<BigStar />}
              arrow={<SmallUpArrow />}
              percent="12%"
            />
            <ProfileCard
              label="Favorite products added"
              amount="2"
              text="10 last 3 months"
              icon={<BigHeart />}
              arrow={<SmallUpArrow />}
              percent="1.3%"
            />
            <ProfileCard
              label="Paid loans"
              amount="13"
              text="2 last 3 months"
              icon={<BigReturn />}
              arrow={<SmallUpArrow />}
              percent="6%"
            />
          </div>
          <div className="py-4 md:py-8">
            <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <img
                    className="h-16 w-16 rounded-lg object-cover"
                    src={loan.imgURL}
                    alt="profile"
                  />
                  <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                    {loan.fullName}
                  </h2>
                </div>
                <PfpLabel caption="Email Address" label={loan.email} />
                <PfpLabel
                  caption="Current Address"
                  label="2 Miles Drive, NJ 071, New York, United States of America"
                />
                <PfpLabel caption="SSS/GSIS Number" label={loan.sss} />
                <PfpLabel caption="TIN Number" label={loan.tin} />
              </div>
              <div className="space-y-4">
                <PfpLabel caption="Gender" label={loan.gender} />
                <PfpLabel caption="Mobile Number" label={loan.contact_num} />
                <PfpLabel caption="Employment Status" label={loan.employment_status} />
                <PfpLabel caption="Employer" label={loan.employer} />
                <PfpLabel
                  caption="Employer Address"
                  label="FLOWBITE LLC, Fiscal code: 18673557"
                />
              </div>
            </div>
            <CustomBttn
              text="Edit profile"
              classname="inline-flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
              <Edit />
            </CustomBttn>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Latest orders
            </h3>
            <LogRow
              id="#FWB12546777"
              date="10.11.2024"
              badge={<Preorder />}
              name="John Doe"
            />
            <LogRow
              id="#FWB12546777"
              date="10.11.2024"
              badge={<Confirmed />}
              name="John Doe"
            />
            <LogRow
              id="#FWB12546777"
              date="10.11.2024"
              badge={<Cancelled />}
              name="John Doe"
            />
            <LogRow
              id="#FWB12546777"
              date="10.11.2024"
              badge={<Confirmed />}
              name="John Doe"
            />
            <LogRow
              id="#FWB12546777"
              date="10.11.2024"
              badge={<Preorder />}
              name="John Doe"
            />
          </div>
        </div>
      </section>
    )
  );
}
