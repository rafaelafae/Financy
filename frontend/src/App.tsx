import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./stores/auth";

import { Layout } from "./components/Layout";

import { Login } from "./pages/Auth/Login";
import { Signup } from "./pages/Auth/Singup";
import { Dashboard } from "./pages/Dashboard";
import { CategoriesPage } from "./pages/Categories";
import { TransactionsPage } from "./pages/Transactions";
import { ProfilePage } from "./pages/Profile";


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}


export function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />

        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/transactions" element={
          <ProtectedRoute>
            <TransactionsPage />
          </ProtectedRoute>
        } />

        <Route path="/categories" element={
          <ProtectedRoute>
            <CategoriesPage />
          </ProtectedRoute>
        } />


        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
      </Routes>
    </Layout>
  )
}