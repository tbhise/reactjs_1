import React from "react";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    sessionStorage.setItem("showLogOutToast", true);
    navigate("/login");
  };

  return (
    <>
      <header
        className="kt-header fixed top-0 z-10 start-0 end-0 flex items-stretch shrink-0 bg-background shadow"
        data-kt-sticky="true"
        data-kt-sticky-classname="border-b border-border"
        data-kt-sticky-name="header"
        id="header"
      >
        <div
          className="kt-container-fixed flex justify-between items-stretch lg:gap-4"
          id="headerContainer"
        >
          <div className="flex gap-2.5 lg:hidden items-center -ms-1">
            <a className="shrink-0" href="/metronic/tailwind/demo1/">
              <img
                className="max-h-[25px] w-full"
                src="../images/mini-logo.svg"
              />
            </a>
            <div className="flex items-center">
              <button
                className="kt-btn kt-btn-icon kt-btn-ghost"
                data-kt-drawer-toggle="#sidebar"
              >
                <i className="ki-filled ki-menu"></i>
              </button>
              <button
                className="kt-btn kt-btn-icon kt-btn-ghost"
                data-kt-drawer-toggle="#mega_menu_wrapper"
              >
                <i className="ki-filled ki-burger-menu-2"></i>
              </button>
            </div>
          </div>

          <div className="flex items-stretch" id="megaMenuContainer">
            <div
              className="flex items-stretch [--kt-reparent-mode:prepend] [--kt-reparent-target:body] lg:[--kt-reparent-target:#megaMenuContainer] lg:[--kt-reparent-mode:prepend]"
              data-kt-reparent="true"
            >
              <div
                className="hidden lg:flex lg:items-stretch [--kt-drawer-enable:true] lg:[--kt-drawer-enable:false]"
                data-kt-drawer="true"
                data-kt-drawer-class="kt-drawer kt-drawer-start fixed z-10 top-0 bottom-0 w-full me-5 max-w-[250px] p-5 lg:p-0 overflow-auto"
                id="mega_menu_wrapper"
              >
                <div
                  className="kt-menu flex-col lg:flex-row gap-5 lg:gap-7.5"
                  data-kt-menu="true"
                  id="mega_menu"
                >
                  <div className="kt-menu-item active">
                    <a
                      className="kt-menu-link text-nowrap text-sm text-foreground font-medium kt-menu-item-hover:text-primary kt-menu-item-active:text-mono kt-menu-item-active:font-medium"
                      href="/dashboard"
                    >
                      <span className="kt-menu-title text-nowrap">Home</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div
              className="shrink-0"
              data-kt-dropdown="true"
              data-kt-dropdown-offset="10px, 10px"
              data-kt-dropdown-offset-rtl="-20px, 10px"
              data-kt-dropdown-placement="bottom-end"
              data-kt-dropdown-placement-rtl="bottom-start"
              data-kt-dropdown-trigger="click"
            >
              <div
                className="cursor-pointer shrink-0"
                data-kt-dropdown-toggle="true"
              >
                <img
                  alt=""
                  className="size-9 rounded-full border-2 border-green-500 shrink-0"
                  src="../images/300-2.png"
                />
              </div>
              <div
                className="kt-dropdown-menu w-[250px]"
                data-kt-dropdown-menu="true"
              >
                <div className="flex items-center justify-between px-2.5 py-1.5 gap-1.5">
                  <div className="flex items-center gap-2">
                    <img
                      alt=""
                      className="size-9 shrink-0 rounded-full border-2 border-green-500"
                      src="../images/300-2.png"
                    />
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm text-foreground font-semibold leading-none">
                        Cody Fisher
                      </span>
                      <a
                        className="text-xs text-secondary-foreground hover:text-primary font-medium leading-none"
                        href="/dashboard"
                      >
                        c.fisher@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="px-2.5 pt-1.5 mb-2.5 flex flex-col gap-3.5">
                  <a
                    className="kt-btn kt-btn-outline justify-center w-full"
                    href="javascript:void(0)"
                    onClick={handleLogout}
                  >
                    Log out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
