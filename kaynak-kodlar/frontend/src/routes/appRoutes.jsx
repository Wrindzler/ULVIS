import { lazy } from 'react';

const ActivityLogs = lazy(() => import('../pages/ActivityLogs'));
const Allocations = lazy(() => import('../pages/Allocations'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Database = lazy(() => import('../pages/Database'));
const Departments = lazy(() => import('../pages/Departments'));
const Hardware = lazy(() => import('../pages/Hardware'));
const Invoices = lazy(() => import('../pages/Invoices'));
const Licenses = lazy(() => import('../pages/Licenses'));
const MyAssets = lazy(() => import('../pages/MyAssets'));
const Notifications = lazy(() => import('../pages/Notifications'));
const Tickets = lazy(() => import('../pages/Tickets'));
const Users = lazy(() => import('../pages/Users'));
const Vendors = lazy(() => import('../pages/Vendors'));

export const protectedRoutes = [
  { path: 'dashboard', element: <Dashboard />, roles: ['IT Müdürü'] },
  { path: 'varliklarim', element: <MyAssets />, roles: ['Personel'] },
  { path: 'donanimlar', element: <Hardware />, roles: ['IT Müdürü', 'IT Destek'] },
  { path: 'lisanslar', element: <Licenses />, roles: ['IT Müdürü', 'IT Destek', 'Satınalma'] },
  { path: 'zimmetler', element: <Allocations />, roles: ['IT Müdürü', 'IT Destek'] },
  { path: 'arizalar', element: <Tickets />, roles: ['IT Müdürü', 'IT Destek', 'Personel'] },
  { path: 'kullanicilar', element: <Users />, roles: ['IT Müdürü'] },
  { path: 'departmanlar', element: <Departments />, roles: ['IT Müdürü'] },
  { path: 'tedarikciler', element: <Vendors />, roles: ['IT Müdürü', 'Satınalma'] },
  { path: 'faturalar', element: <Invoices />, roles: ['IT Müdürü', 'Satınalma'] },
  { path: 'bildirimler', element: <Notifications /> },
  { path: 'veritabani', element: <Database />, roles: ['IT Müdürü'] },
  { path: 'islem-loglari', element: <ActivityLogs />, roles: ['IT Müdürü'] },
];
