import React from "react";

export default function EmptySearch({label, context}) {
    return (
        <div className="w-full flex items-center my-20 px-10 py-5 flex-wrap justify-center gap-10">
            <div className="grid gap-4 w-60">
                <div className="w-20 h-20 mx-auto bg-white dark:bg-gray-400 rounded-full shadow-md justify-center items-center inline-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="42" viewBox="0 0 33 32" fill="none">
                        <g id="File Serch">
                            <path id="Vector" d="M19.9762 4V8C19.9762 8.61954 19.9762 8.92931 20.0274 9.18691C20.2379 10.2447 21.0648 11.0717 22.1226 11.2821C22.3802 11.3333 22.69 11.3333 23.3095 11.3333H27.3095M18.6429 19.3333L20.6429 21.3333M19.3095 28H13.9762C10.205 28 8.31934 28 7.14777 26.8284C5.9762 25.6569 5.9762 23.7712 5.9762 20V12C5.9762 8.22876 5.9762 6.34315 7.14777 5.17157C8.31934 4 10.205 4 13.9762 4H19.5812C20.7604 4 21.35 4 21.8711 4.23403C22.3922 4.46805 22.7839 4.90872 23.5674 5.79006L25.9624 8.48446C26.6284 9.23371 26.9614 9.60833 27.1355 10.0662C27.3095 10.524 27.3095 11.0253 27.3095 12.0277V20C27.3095 23.7712 27.3095 25.6569 26.138 26.8284C24.9664 28 23.0808 28 19.3095 28ZM19.3095 16.6667C19.3095 18.5076 17.8171 20 15.9762 20C14.1352 20 12.6429 18.5076 12.6429 16.6667C12.6429 14.8257 14.1352 13.3333 15.9762 13.3333C17.8171 13.3333 19.3095 14.8257 19.3095 16.6667Z"
                            stroke="#f43f5e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    </svg>
                </div>
                <div>
                    <h2 className="text-center text-gray-500 text-xl font-semibold leading-loose pb-2">{label}</h2>
                    <p className="text-center text-gray-500 text-base font-normal leading-relaxed pb-4">{context}</p>
                </div>
            </div>
        </div>
    );
}