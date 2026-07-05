import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppShell from '@/components/AppShell'
import AdminPage from '@/pages/AdminPage'
import AuthPage from '@/pages/AuthPage'
import CommunityPage from '@/pages/CommunityPage'
import CoursesPage from '@/pages/CoursesPage'
import DashboardPage from '@/pages/DashboardPage'
import Home from '@/pages/Home'
import LessonPage from '@/pages/LessonPage'
import OnboardingPage from '@/pages/OnboardingPage'
import ProfilePage from '@/pages/ProfilePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />} path="/">
          <Route element={<Home />} index />
          <Route element={<AuthPage />} path="auth/register" />
          <Route element={<AuthPage />} path="auth/login" />
          <Route element={<OnboardingPage />} path="onboarding" />
          <Route element={<CoursesPage />} path="courses" />
          <Route element={<LessonPage />} path="learn/:lessonId" />
          <Route element={<DashboardPage />} path="dashboard" />
          <Route element={<CommunityPage />} path="community" />
          <Route element={<ProfilePage />} path="profile" />
          <Route element={<AdminPage />} path="admin" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
