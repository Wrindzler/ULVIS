/**
 * Rota ağacı: açık sayfalar, korumalı layout altındaki rol bazlı sayfalar
 * ve bilinmeyen yollar için güvenli kök yönlendirmesi burada birleştirilir.
 */
import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import ForceChangePassword from './pages/ForceChangePassword';
import Home from './pages/Home';
import CookieConsent from './components/CookieConsent';
import PageLoader from './components/PageLoader';
import { protectedRoutes } from './routes/appRoutes';

/* Oturum açıksa role göre varsayılan hedef seçilir. */
function DefaultRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.rol === 'Personel') return <Navigate to="/varliklarim" />;
  if (user.rol === 'Satınalma') return <Navigate to="/lisanslar" />;
  return <Home />;
}

function renderProtectedRoute({ path, element, roles }) {
  const page = <Suspense fallback={<PageLoader />}>{element}</Suspense>;

  return (
    <Route
      key={path}
      path={path}
      element={roles ? <PrivateRoute roles={roles}>{page}</PrivateRoute> : page}
    />
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/sifre-degistir"
          element={
            <PrivateRoute allowForcedChange>
              <ForceChangePassword />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<DefaultRedirect />} />
          {protectedRoutes.map(renderProtectedRoute)}
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <CookieConsent />
    </>
  );
}
