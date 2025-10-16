import React, { useEffect } from "react";
import { toast } from "react-toastify";
import MainLayout from "../Layouts/MainLayout";
function Dashboard() {
  useEffect(() => {
    if (sessionStorage.getItem("showLoginToast")) {
      toast.success("Logged in successfully! 🎉");
      sessionStorage.removeItem("showLoginToast");
    }
  }, []);

  return (
    <>
      <MainLayout>
        <div className="kt-container-fixed">
          <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
            <div className="flex flex-col justify-center gap-2">
              <h1 className="text-xl font-medium leading-none text-mono">
                Dashboard
              </h1>
              <div className="flex items-center gap-2 text-sm font-normal text-secondary-foreground">
                Central Hub for Personal Customization
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <a
                className="kt-btn kt-btn-outline"
                href="/metronic/tailwind/demo1/public-profile/profiles/default"
              >
                View Profile
              </a>
            </div>
          </div>
        </div>

        <div className="kt-container-fixed">
          <div className="grid gap-5 lg:gap-7.5">
            <div className="grid lg:grid-cols-3 gap-y-5 lg:gap-7.5 items-stretch">
              <div className="lg:col-span-1">
                <div className="grid grid-cols-2 gap-5 lg:gap-7.5 h-full items-stretch">
                  <div className="kt-card flex-col justify-between gap-6 h-full bg-cover rtl:bg-[left_top_-1.7rem] bg-[right_top_-1.7rem] bg-no-repeat channel-stats-bg">
                    <img
                      alt=""
                      className="w-7 mt-4 ms-5"
                      src="../images/linkedin-2.svg"
                    />
                    <div className="flex flex-col gap-1 pb-4 px-5">
                      <span className="text-3xl font-semibold text-mono">
                        9.3k
                      </span>
                      <span className="text-sm font-normal text-secondary-foreground">
                        Amazing mates
                      </span>
                    </div>
                  </div>
                  <div className="kt-card flex-col justify-between gap-6 h-full bg-cover rtl:bg-[left_top_-1.7rem] bg-[right_top_-1.7rem] bg-no-repeat channel-stats-bg">
                    <img
                      alt=""
                      className="w-7 mt-4 ms-5"
                      src="../images/youtube-2.svg"
                    />
                    <div className="flex flex-col gap-1 pb-4 px-5">
                      <span className="text-3xl font-semibold text-mono">
                        24k
                      </span>
                      <span className="text-sm font-normal text-secondary-foreground">
                        Lessons Views
                      </span>
                    </div>
                  </div>
                  <div className="kt-card flex-col justify-between gap-6 h-full bg-cover rtl:bg-[left_top_-1.7rem] bg-[right_top_-1.7rem] bg-no-repeat channel-stats-bg">
                    <img
                      alt=""
                      className="w-7 mt-4 ms-5"
                      src="../images/instagram-03.svg"
                    />
                    <div className="flex flex-col gap-1 pb-4 px-5">
                      <span className="text-3xl font-semibold text-mono">
                        608
                      </span>
                      <span className="text-sm font-normal text-secondary-foreground">
                        New subscribers
                      </span>
                    </div>
                  </div>
                  <div className="kt-card flex-col justify-between gap-6 h-full bg-cover rtl:bg-[left_top_-1.7rem] bg-[right_top_-1.7rem] bg-no-repeat channel-stats-bg">
                    <img
                      alt=""
                      className="dark:hidden w-7 mt-4 ms-5"
                      src="../images/tiktok.svg"
                    />
                    <img
                      alt=""
                      className="hidden dark:block w-7 mt-4 ms-5"
                      src="../images/tiktok-dark.svg"
                    />
                    <div className="flex flex-col gap-1 pb-4 px-5">
                      <span className="text-3xl font-semibold text-mono">
                        2.5k
                      </span>
                      <span className="text-sm font-normal text-secondary-foreground">
                        Stream audience
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default Dashboard;
