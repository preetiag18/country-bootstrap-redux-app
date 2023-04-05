import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { initializeCountries } from "../features/countries/countriesSlice";
import { initializeFavourites } from "../features/countries/favouritesSlice";

const ProtectedRoute = ({ user, children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeFavourites());
    dispatch(initializeCountries());
  }, [dispatch]);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export { ProtectedRoute };
