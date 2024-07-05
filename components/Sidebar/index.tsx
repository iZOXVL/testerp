"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { IoIosApps, IoIosRocket } from "react-icons/io";
import { FaCity, FaCloud, FaFileInvoiceDollar, FaUser, FaUserGraduate, FaUsers } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdArrowForwardIos, MdSell } from "react-icons/md";
import { motion } from "framer-motion";
import { FaCartShopping, FaHandshakeSimple, FaMoneyBillTrendUp, FaUserGear } from "react-icons/fa6";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const dropdownVariants = {
    open: { opacity: 1, height: "auto" },
    collapsed: { opacity: 0, height: 0 }
  };

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-morado duration-400 ease-linear dark:bg-oscuro lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* SIDEBAR HEADER */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/" className="justify-center ml-4">
          <Image
            width={200}
            height={200}
            src="/images/logos/logo_blanco.png"
            alt="Logo"
            className="block dark:hidden"
            priority
          />
          <Image
            width={200}
            height={200}
            src="/images/logos/logo_blanco.png"
            alt="Logo Dark"
            className="hidden dark:block"
            priority
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden text-blanco dark:text-blanco"  
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* SIDEBAR HEADER */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-400 ease-linear">
        {/* Sidebar Menu */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* Menu Group */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-blanco dark:text-blanco">
              Menú
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/auth" || pathname.includes("auth")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium  text-blanco duration-400 ease-in-out hover:bg-cuatro dark:text-blanco dark:hover:bg-cuatro ${
                          (pathname === "/auth" ||
                            pathname.includes("auth")) &&
                          "g-tres text-uno dark:text--dos"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <IoIosRocket />
                        Marketing
                        <MdArrowForwardIos
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-90"
                          }`}
                        />
                      </Link>
                      {/* Dropdown Menu Start */}
                      <motion.div
                        initial="collapsed"
                        animate={open ? "open" : "collapsed"}
                        variants={dropdownVariants}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/auth/signin"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/auth/signin" &&
                                " dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/auth/signup"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco  dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/auth/signup" &&
                                "dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                        </ul>
                      </motion.div>
                      {/* Dropdown Menu End */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/companies" || pathname.includes("companies")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-blanco duration-400 ease-in-out hover:bg-cuatro dark:text-blanco dark:hover:bg-cuatro ${
                          (pathname === "/companies" ||
                            pathname.includes("companies")) &&
                          "g-tres text-uno dark:text--dos"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaCity />
                        Empresas
                        <MdArrowForwardIos
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-90"
                          }`}
                        />
                      </Link>
                      {/* Dropdown Menu Start */}
                      <motion.div
                        initial="collapsed"
                        animate={open ? "open" : "collapsed"}
                        variants={dropdownVariants}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/companies/signin"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/companies/signin" &&
                                " dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/companies/signup"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco  dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/companies/signup" &&
                                "dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                        </ul>
                      </motion.div>
                      {/* Dropdown Menu End */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/clients" || pathname.includes("clients")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-blanco duration-400 ease-in-out hover:bg-cuatro dark:text-blanco dark:hover:bg-cuatro ${
                          (pathname === "/clients" ||
                            pathname.includes("clients")) &&
                          "g-tres text-uno dark:text--dos"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaUsers />
                        Clientes
                        <MdArrowForwardIos
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-90"
                          }`}
                        />
                      </Link>
                      {/* Dropdown Menu Start */}
                      <motion.div
                        initial="collapsed"
                        animate={open ? "open" : "collapsed"}
                        variants={dropdownVariants}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/clients/signin"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/clients/signin" &&
                                " dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/clients/signup"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco  dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/clients/signup" &&
                                "dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                        </ul>
                      </motion.div>
                      {/* Dropdown Menu End */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/hr" || pathname.includes("hr")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-blanco duration-400 ease-in-out hover:bg-cuatro dark:text-blanco dark:hover:bg-cuatro ${
                          (pathname === "/hr" || pathname.includes("hr")) &&
                          "g-tres text-uno dark:text--dos"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaHandshakeSimple />
                        Recursos Humanos
                        <MdArrowForwardIos
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-90"
                          }`}
                        />
                      </Link>
                      {/* Dropdown Menu Start */}
                      <motion.div
                        initial="collapsed"
                        animate={open ? "open" : "collapsed"}
                        variants={dropdownVariants}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
  <li>
    <Link
      href="/hr/employees"
      className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
        pathname === "/hr/employees" && "dark:text-blanco text-blanco"
      }`}
    >
      Empleados
    </Link>
  </li>
  <li>
    <Link
      href="/hr/benefits"
      className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
        pathname === "/hr/benefits" && "dark:text-blanco text-blanco"
      }`}
    >
      Prestaciones
    </Link>
  </li>
  <li>
    <Link
      href="/hr/incidents"
      className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
        pathname === "/hr/incidents" && "dark:text-blanco text-blanco"
      }`}
    >
      Incidencias
    </Link>
  </li>
  <li>
    <Link
      href="/hr/loans"
      className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
        pathname === "/hr/loans" && "dark:text-blanco text-blanco"
      }`}
    >
      Préstamos
    </Link>
  </li>
  <li>
    <Link
      href="/hr/salaries"
      className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
        pathname === "/hr/salaries" && "dark:text-blanco text-blanco"
      }`}
    >
      Sueldos
    </Link>
  </li>
</ul>

                      </motion.div>
                      {/* Dropdown Menu End */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/finance" || pathname.includes("finance")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-blanco duration-400 ease-in-out hover:bg-cuatro dark:text-blanco dark:hover:bg-cuatro ${
                          (pathname === "/finance" ||
                            pathname.includes("finance")) &&
                          "g-tres text-uno dark:text--dos"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaMoneyBillTrendUp />
                        Finanzas
                        <MdArrowForwardIos
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-90"
                          }`}
                        />
                      </Link>
                      {/* Dropdown Menu Start */}
                      <motion.div
                        initial="collapsed"
                        animate={open ? "open" : "collapsed"}
                        variants={dropdownVariants}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/finance/signin"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/finance/signin" &&
                                " dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/finance/signup"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco  dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/finance/signup" &&
                                "dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                        </ul>
                      </motion.div>
                      {/* Dropdown Menu End */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/finance" || pathname.includes("finance")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-blanco duration-400 ease-in-out hover:bg-cuatro dark:text-blanco dark:hover:bg-cuatro ${
                          (pathname === "/finance" ||
                            pathname.includes("finance")) &&
                          "g-tres text-uno dark:text--dos"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaUserGear />
                        Administración
                        <MdArrowForwardIos
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-90"
                          }`}
                        />
                      </Link>
                      {/* Dropdown Menu Start */}
                      <motion.div
                        initial="collapsed"
                        animate={open ? "open" : "collapsed"}
                        variants={dropdownVariants}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/finance/signin"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/finance/signin" &&
                                " dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/finance/signup"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco  dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/finance/signup" &&
                                "dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                        </ul>
                      </motion.div>
                      {/* Dropdown Menu End */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/admin" || pathname.includes("admin")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-blanco duration-400 ease-in-out hover:bg-cuatro dark:text-blanco dark:hover:bg-cuatro ${
                          (pathname === "/admin" || pathname.includes("admin")) &&
                          "g-tres text-uno dark:text--dos"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaCloud />
                        Infraestructura
                        <MdArrowForwardIos
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-90"
                          }`}
                        />
                      </Link>
                      {/* Dropdown Menu Start */}
                      <motion.div
                        initial="collapsed"
                        animate={open ? "open" : "collapsed"}
                        variants={dropdownVariants}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/admin/signin"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/admin/signin" &&
                                " dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/admin/signup"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco  dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/admin/signup" &&
                                "dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                        </ul>
                      </motion.div>
                      {/* Dropdown Menu End */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/projects" || pathname.includes("projects")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-blanco duration-400 ease-in-out hover:bg-cuatro dark:text-blanco dark:hover:bg-cuatro ${
                          (pathname === "/projects" || pathname.includes("projects")) &&
                          "g-tres text-uno dark:text--dos"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <IoIosApps />
                        Proyectos
                        <MdArrowForwardIos
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-90"
                          }`}
                        />
                      </Link>
                      {/* Dropdown Menu Start */}
                      <motion.div
                        initial="collapsed"
                        animate={open ? "open" : "collapsed"}
                        variants={dropdownVariants}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/projects/signin"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/projects/signin" &&
                                " dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/projects/signup"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco  dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/projects/signup" &&
                                "dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                        </ul>
                      </motion.div>
                      {/* Dropdown Menu End */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/providers" || pathname.includes("providers")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-blanco duration-400 ease-in-out hover:bg-cuatro dark:text-blanco dark:hover:bg-cuatro ${
                          (pathname === "/providers" || pathname.includes("providers")) &&
                          "g-tres text-uno dark:text--dos"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaCartShopping />
                        Proveedores
                        <MdArrowForwardIos
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-90"
                          }`}
                        />
                      </Link>
                      {/* Dropdown Menu Start */}
                      <motion.div
                        initial="collapsed"
                        animate={open ? "open" : "collapsed"}
                        variants={dropdownVariants}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/providers/signin"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/providers/signin" &&
                                " dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/providers/signup"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco  dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/providers/signup" &&
                                "dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                        </ul>
                      </motion.div>
                      {/* Dropdown Menu End */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/purchases" || pathname.includes("purchases")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-blanco duration-400 ease-in-out hover:bg-cuatro dark:text-blanco dark:hover:bg-cuatro ${
                          (pathname === "/purchases" || pathname.includes("purchases")) &&
                          "g-tres text-uno dark:text--dos"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaFileInvoiceDollar />
                        Compras
                        <MdArrowForwardIos
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-90"
                          }`}
                        />
                      </Link>
                      {/* Dropdown Menu Start */}
                      <motion.div
                        initial="collapsed"
                        animate={open ? "open" : "collapsed"}
                        variants={dropdownVariants}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/purchases/signin"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/purchases/signin" &&
                                " dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/purchases/signup"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco  dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/purchases/signup" &&
                                "dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                        </ul>
                      </motion.div>
                      {/* Dropdown Menu End */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/sales" || pathname.includes("sales")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-blanco duration-400 ease-in-out hover:bg-cuatro dark:text-blanco dark:hover:bg-cuatro ${
                          (pathname === "/sales" || pathname.includes("sales")) &&
                          "g-tres text-uno dark:text--dos"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <MdSell />
                        Ventas
                        <MdArrowForwardIos
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-90"
                          }`}
                        />
                      </Link>
                      {/* Dropdown Menu Start */}
                      <motion.div
                        initial="collapsed"
                        animate={open ? "open" : "collapsed"}
                        variants={dropdownVariants}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/sales/signin"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/sales/signin" &&
                                " dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/sales/signup"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco  dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/sales/signup" &&
                                "dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                        </ul>
                      </motion.div>
                      {/* Dropdown Menu End */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/recruitment" || pathname.includes("recruitment")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-blanco duration-400 ease-in-out hover:bg-cuatro dark:text-blanco dark:hover:bg-cuatro ${
                          (pathname === "/recruitment" || pathname.includes("recruitment")) &&
                          "g-tres text-uno dark:text--dos"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <FaUserGraduate />
                        Reclutamiento
                        <MdArrowForwardIos
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-90"
                          }`}
                        />
                      </Link>
                      {/* Dropdown Menu Start */}
                      <motion.div
                        initial="collapsed"
                        animate={open ? "open" : "collapsed"}
                        variants={dropdownVariants}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                          <li>
                            <Link
                              href="/recruitment/signin"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/recruitment/signin" &&
                                " dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/recruitment/signup"
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-blanco  dark:text-blanco duration-300 ease-in-out dark:hover:text-cuatro hover:text-cuatro ${
                                pathname === "/recruitment/signup" &&
                                "dark:text-blanco text-blanco"
                              }`}
                            >
                              Submenu
                            </Link>
                          </li>
                        </ul>
                      </motion.div>
                      {/* Dropdown Menu End */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </nav>
        {/* Sidebar Menu */}
      </div>
    </aside>
  );
};

export default Sidebar;
