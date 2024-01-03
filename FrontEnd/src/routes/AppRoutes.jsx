import React from "react";
import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "@/layouts";
import { Home, Login, SignUp } from "@/pages";
import Boutique from "../pages/Boutique/Boutique";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/logIn" element={<Login />} />
          <Route path="/boutique" element={<Boutique />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
