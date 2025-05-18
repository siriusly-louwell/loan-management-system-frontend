import React from 'react';

export default function Spinner({id, text}) {
    return (
        <div id={id} class="fixed hidden left-0 right-0 md:inset-0 h-full w-full flex justify-center items-center bg-gray-100 bg-opacity-50 dark:bg-gray-700 dark:bg-opacity-50">
            {/* <div class="grid gap-3">
                <div class="flex items-center justify-center">
                    <svg class="animate-spin border-indigo-600" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <g id="Group 1000003698">
                            <circle id="Ellipse 713" cx="19.9997" cy="19.9277" r="15" stroke="#E5E7EB" stroke-width="2" />
                            <path id="Ellipse 714" d="M26.3311 33.528C29.9376 31.8488 32.7294 28.8058 34.0923 25.0683C35.4552 21.3308 35.2775 17.2049 33.5984 13.5984C31.9193 9.99189 28.8762 7.20011 25.1387 5.83723C21.4012 4.47434 17.2754 4.652 13.6689 6.33112" stroke="url(#paint0_linear_13416_7408)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_13416_7408" x1="0.0704424" y1="12.6622" x2="12.7327" y2="39.8591" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#4F46E5" />
                                <stop offset="1" stop-color="#8B5CF6" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <span class="text-black text-sm font-normal leading-snug dark:text-gray-300">Loading...</span>
            </div> */}

            <div class="grid gap-3">
                <div class="flex items-center justify-center">
                    <svg class="animate-spin border-indigo-600" xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54" fill="none">
                        <g id="Group 1000003701">
                            <circle id="Ellipse 715" cx="26.9998" cy="26.5693" r="20" transform="rotate(90 26.9998 26.5693)" stroke="#E5E7EB" stroke-width="4" />
                            <path id="Ellipse 716" d="M35.4391 44.7038C37.8203 43.5955 39.9599 42.0291 41.7357 40.094C43.5115 38.1589 44.8887 35.893 45.7888 33.4256C46.6889 30.9582 47.0942 28.3377 46.9816 25.7137C46.8689 23.0896 46.2406 20.5135 45.1323 18.1323C44.0241 15.7512 42.4577 13.6116 40.5226 11.8358C38.5875 10.06 36.3215 8.68269 33.8541 7.7826C31.3867 6.8825 28.7662 6.4772 26.1422 6.58985C23.5182 6.7025 20.942 7.33088 18.5609 8.43912" stroke="url(#paint0_linear_13416_7433)" stroke-width="4" stroke-linecap="round" />
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_13416_7433" x1="0.428554" y1="16.8782" x2="17.3068" y2="53.1429" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#4F46E5" />
                                <stop offset="1" stop-color="#8B5CF6" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <span class="text-black text-sm font-normal leading-snug dark:text-gray-300">{text}</span>
            </div>

            {/* <div class="grid gap-3">
                <div class="flex items-center justify-center">
                    <svg class="animate-spin border-indigo-600" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                        <g id="Group 1000003699">
                            <circle id="Ellipse 715" cx="31.9989" cy="31.8809" r="24" stroke="#E5E7EB" stroke-width="6" />
                            <path id="Ellipse 716" d="M42.111 53.6434C44.9694 52.3156 47.5383 50.4378 49.6709 48.1172C51.8036 45.7967 53.4583 43.0787 54.5406 40.1187C55.6229 37.1586 56.1115 34.0143 55.9787 30.8654C55.8458 27.7165 55.094 24.6246 53.7662 21.7662C52.4384 18.9078 50.5606 16.339 48.24 14.2063C45.9194 12.0736 43.2015 10.4189 40.2414 9.33662C37.2814 8.25434 34.1371 7.76569 30.9882 7.89856C27.8393 8.03143 24.7473 8.78323 21.889 10.111" stroke="url(#paint0_linear_13416_7438)" stroke-width="6" stroke-linecap="round" />
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_13416_7438" x1="0.122767" y1="20.2221" x2="20.3448" y2="63.7544" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#4F46E5" />
                                <stop offset="1" stop-color="#8B5CF6" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <span class="text-black text-sm font-normal leading-snug dark:text-gray-300">Loading...</span>
            </div> */}
            
            {/* <div class="grid gap-3">
                <div class="flex items-center justify-center">
                    <svg class="animate-spin border-indigo-600" xmlns="http://www.w3.org/2000/svg" width="76" height="75" viewBox="0 0 76 75" fill="none">
                        <g id="Group 1000003700">
                            <circle id="Ellipse 715" cx="38.0004" cy="37.1953" r="28" stroke="#E5E7EB" stroke-width="8" />
                            <path id="Ellipse 716" d="M49.8079 62.5848C53.142 61.0342 56.138 58.842 58.6248 56.1335C61.1117 53.425 63.0407 50.2532 64.3018 46.7992C65.5629 43.3452 66.1313 39.6767 65.9745 36.003C65.8178 32.3293 64.939 28.7225 63.3884 25.3884C61.8378 22.0544 59.6456 19.0584 56.9371 16.5715C54.2286 14.0847 51.0568 12.1556 47.6028 10.8946C44.1488 9.63351 40.4802 9.06511 36.8066 9.22183C33.1329 9.37855 29.5261 10.2573 26.192 11.808" stroke="url(#paint0_linear_13416_7443)" stroke-width="8" stroke-linecap="round" />
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_13416_7443" x1="0.803595" y1="23.6159" x2="24.4195" y2="74.3928" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#4F46E5" />
                                <stop offset="1" stop-color="#8B5CF6" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <span class="text-black text-sm font-normal leading-snug dark:text-gray-300">Loading...</span>
            </div> */}
        </div>
    );
}