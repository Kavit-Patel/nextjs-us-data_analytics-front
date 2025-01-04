"use client";
import { useEffect, useState } from "react";
import { useUserLogin, useUserLogOut } from "@/lib/query";
import { usePathname, useRouter } from "next/navigation";
import { MdMenu } from "react-icons/md";
import Loader from "./Loader";
import toast from "react-hot-toast";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { data: user, refetch } = useUserLogin();
  const { mutateAsync, isPending: isLogOutPending } = useUserLogOut();
  useEffect(() => {
    if (!user && pathname === "/login") {
      refetch();
    }
  }, [pathname, refetch, user]);
  const handleLogout = async () => {
    await mutateAsync();
    router.push("/");
  };
  return (
    <header className="bg-gray-800 hover:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-bold text-sky-600">URL Shortener</span>
        </div>

        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <MdMenu />
          </button>
        </div>
        <nav className="hidden sm:flex items-center space-x-6">
          {user ? (
            <>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                }}
                className="flex items-center space-x-4 text-gray-700"
              >
                <span className="font-medium text-gray-400">Welcome,</span>
                <span className="font-semibold text-gray-400">
                  {user?.name || "User"}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    toast.success("Feature under development!");
                    router.push("/analytics");
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg w-24 hover:bg-blue-600 transition"
                >
                  Analytics
                </button>
                <button
                  onClick={() => router.push("/myurls")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg w-24 hover:bg-blue-600 transition"
                >
                  My-Urls
                </button>
                <button
                  disabled={isLogOutPending}
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg w-24 hover:bg-red-600 transition"
                >
                  {isLogOutPending ? (
                    <Loader width={30} height={30} color="orange" />
                  ) : (
                    "Logout"
                  )}
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                router.push("/login");
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
          )}
        </nav>
      </div>

      {menuOpen && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(false);
          }}
          className="sm:hidden absolute w-screen h-[calc(100vh-64px)] bg-gray-800"
        >
          <nav className="flex flex-col space-y-4 p-4 text-gray-300">
            {user ? (
              <>
                <div className="text-center">
                  <span className="block text-gray-400">
                    Welcome, {user?.name || "User"}
                  </span>
                </div>
                <button
                  onClick={() => {
                    toast.success("Feature under development!");
                    router.push("/analytics");
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Analytics
                </button>
                <button
                  onClick={() => router.push("/myurls")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  My-Urls
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  router.push("/login");
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Login
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
