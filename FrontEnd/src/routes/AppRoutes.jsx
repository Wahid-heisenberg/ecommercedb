import React from "react";
import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "@/layouts";
import { Home, Login } from "@/pages";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout/>}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
