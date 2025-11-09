import React from "react";

export default function UnderlineTabs({ children }) {
  // const location = useLocation();

  // function activeTab(path) {
  //   return (
  //     location.pathname === path ||
  //     location.pathname === `/prodlist${path}` ||
  //     location.pathname === `/customer${path}` ||
  //     (path === "/" && location.pathname === "/prodlist") ||
  //     (path === "/" && location.pathname === "/customer")
  //   );
  // }

  return (
    <div className="mt-5 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {children}
        {/* <UlTab text="All" isPage={activeTab("/")} path="" />
        <UlTab text="Top units" isPage={activeTab("/top")} path="top" />
        <UlTab text="Brand New" isPage={activeTab("/new")} path="new" />
        <UlTab text="Repo units" isPage={activeTab("/repo")} path="repo" /> */}
        {/* <li>
          <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">
            Disabled
          </a>
        </li> */}
      </ul>
    </div>
  );
}
