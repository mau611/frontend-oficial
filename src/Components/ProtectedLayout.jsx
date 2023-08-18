import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../AuthContext";

export default function DefaultLayout() {

  return (
    <>
      
      <main className="">
        <Outlet />
      </main>
    </>
  );
}
