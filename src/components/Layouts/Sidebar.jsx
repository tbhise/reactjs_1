import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <>
      <div
        className="kt-sidebar bg-background border-e border-e-border fixed top-0 bottom-0 z-20 hidden lg:flex flex-col items-stretch shrink-0 [--kt-drawer-enable:true] lg:[--kt-drawer-enable:false]"
        data-kt-drawer="true"
        data-kt-drawer-class="kt-drawer kt-drawer-start top-0 bottom-0"
        id="sidebar"
      >
        <div
          className="kt-sidebar-header hidden lg:flex items-center relative justify-between px-3 lg:px-6 shrink-0"
          id="sidebar_header"
        >
          <a className="dark:hidden" href="/dashboard">
            <img
              className="default-logo min-h-[22px] max-w-none"
              src="../images/default-logo.svg"
            />
            <img
              className="small-logo min-h-[22px] max-w-none"
              src="../images/mini-logo.svg"
            />
          </a>
          <a className="hidden dark:block" href="/dashboard">
            <img
              className="default-logo min-h-[22px] max-w-none"
              src="../images/default-logo_2.svg"
            />
            <img
              className="small-logo min-h-[22px] max-w-none"
              src="../images/mini-logo.svg"
            />
          </a>
          <button
            className="kt-btn kt-btn-outline kt-btn-icon size-[30px] absolute start-full top-2/4 -translate-x-2/4 -translate-y-2/4 rtl:translate-x-2/4"
            data-kt-toggle="body"
            id="sidebar_toggle"
          >
            <i className="ki-filled ki-black-left-line kt-toggle-active:rotate-180 transition-all duration-300 rtl:translate rtl:rotate-180 rtl:kt-toggle-active:rotate-0"></i>
          </button>
        </div>
        <div
          className="kt-sidebar-content flex grow shrink-0 py-5 pe-2"
          id="sidebar_content"
        >
          <div
            className="kt-scrollable-y-hover grow shrink-0 flex ps-2 lg:ps-5 pe-1 lg:pe-3"
            data-kt-scrollable="true"
            data-kt-scrollable-dependencies="#sidebar_header"
            data-kt-scrollable-height="auto"
            data-kt-scrollable-offset="0px"
            data-kt-scrollable-wrappers="#sidebar_content"
            id="sidebar_scrollable"
          >
            <div
              className="kt-menu flex flex-col grow gap-1"
              data-kt-menu="true"
              data-kt-menu-accordion-expand-all="false"
              id="sidebar_menu"
            >
              <div
                className="kt-menu-item here show"
                data-kt-menu-item-toggle="accordion"
                data-kt-menu-item-trigger="click"
              >
                {/* Updated: Use Link instead of div, keep existing classes */}
                <Link
                  to="/dashboard"
                  className={`kt-menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] ps-[10px] pe-[10px] py-[6px] ${
                    location.pathname === "/dashboard"
                      ? "kt-menu-item-active:text-primary kt-menu-link-hover:!text-primary"
                      : "text-foreground"
                  }`}
                  tabIndex="0"
                >
                  <span className="kt-menu-icon items-start text-muted-foreground w-[20px]">
                    <i className="ki-filled ki-element-11 text-lg"></i>
                  </span>
                  <span className="kt-menu-title text-sm font-medium">
                    Dashboards
                  </span>
                </Link>

                <Link
                  to="/users"
                  className={`kt-menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] ps-[10px] pe-[10px] py-[6px] ${
                    location.pathname === "/users"
                      ? "kt-menu-item-active:text-primary kt-menu-link-hover:!text-primary"
                      : "text-foreground"
                  }`}
                  tabIndex="0"
                >
                  <span className="kt-menu-icon items-start text-muted-foreground w-[20px]">
                    <i className="ki-filled ki-element-11 text-lg"></i>
                  </span>
                  <span className="kt-menu-title text-sm font-medium">
                    Users
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
