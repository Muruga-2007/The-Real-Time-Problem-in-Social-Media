import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell.jsx'
import { AuthGuard } from './components/auth/AuthGuard.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { ExplorePage } from './pages/ExplorePage.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { ProfilePage } from './pages/ProfilePage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { SignupPage } from './pages/SignupPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'

export const router = createBrowserRouter([
  { path: '/login',  element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  {
    element: <AuthGuard />,
    children: [
      {
        element: <AppShell />,
        children: [
          { path: '/',                    element: <HomePage /> },
          { path: '/explore',             element: <ExplorePage /> },
          { path: '/dashboard',           element: <DashboardPage /> },
          { path: '/profile/:username',   element: <ProfilePage /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
