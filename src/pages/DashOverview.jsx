import React from "react";
import InfoCard from '../components/cards/InfoCard';
import UpArrow from '../assets/icons/UpArrow';
import DownArrow from '../assets/icons/DownArrown';
import Bar from '../components/charts/Bar';
import Donut from '../components/charts/Donut';
import Line from '../components/charts/Line';

export default function DashOverview() {
    return (
        <section>
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-10">
                <InfoCard amount="2,100" label="New units this month" percent="14.6%" arrow={<UpArrow />} />
                <InfoCard amount="5,355" label="Applications this month" percent="32.9%" arrow={<UpArrow />} />
                <InfoCard amount="385" label="Loans this month" percent="-3.7%" arrow={<DownArrow />} />
            </div>
            <div className="grid justify-items-center py-5 grid-cols-auto md:grid-cols-3 gap-4 items-start">
                <Donut />
                <Bar />
                <Line />
            </div>
        </section>
    );
}