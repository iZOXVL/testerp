"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { FaFacebook, FaInstagram, FaLinkedin, FaPowerOff, FaTwitter, FaUser } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion"; // Importamos motion y AnimatePresence de framer-motion
import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/actions/logout";





const DropdownUser = () => {
  const user = useCurrentUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const LogOut = () => {
    logout();
  };

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-blanco dark:text-blanco">
            {user?.name}
          </span>
          <span className="block text-xs text-blanco dark:text-blanco"> {user?.role}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={user?.image || ""}
            className="w-auto h-auto rounded-full"
            alt="User"
          />
        </span>

        <IoIosArrowDown className="text-blanco" />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            ref={dropdown}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-blanco"
          >
            <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 text-oscuro dark:border-strokedark">
              <li>
                <Link
                  href="/profile"
                  className="flex items-center gap-3.5 text-sm font-medium duration-300 text-oscuro ease-in-out hover:text-cuatro lg:text-base"
                >
                  <FaUser />
                  Mi Perfil
                </Link>
              </li>
            </ul>
            <button onClick={LogOut} className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out text-oscuro hover:text-cuatro lg:text-base">
              <FaPowerOff />
              Cerrar sesión
            </button>
            <div className="flex border-t-[0.1px] dark:border-strokedark border-stroke items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out text-oscuro hover:text-cuatro lg:text-base">
              <div className="flex gap-4 items-center justify-center text-center">
                <Link href={""}>
                  <Button isIconOnly aria-label="Like" className="text-3xl bg-transparent text-oscuro">
                    <FaFacebook />
                  </Button>
                </Link>
                <Link href={""}>
                  <Button isIconOnly aria-label="Like" className="text-3xl bg-transparent text-oscuro">
                    <FaTwitter />
                  </Button>
                </Link>
                <Link href={""}>
                  <Button isIconOnly aria-label="Like" className="text-3xl bg-transparent text-oscuro">
                    <FaLinkedin />
                  </Button>
                </Link>
                <Link href={""}>
                  <Button isIconOnly aria-label="Like" className="text-3xl bg-transparent text-oscuro">
                    <FaInstagram />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
