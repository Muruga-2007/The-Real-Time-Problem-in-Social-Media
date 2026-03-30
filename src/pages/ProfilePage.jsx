import { useParams } from 'react-router-dom'
import { PageTransition } from '../components/layout/PageTransition.jsx'
import { ProfileHeader } from '../components/profile/ProfileHeader.jsx'
import { ProfilePostGrid } from '../components/profile/ProfilePostGrid.jsx'
import { useAuthStore } from '../store/authStore.js'

export function ProfilePage() {
  const { username } = useParams()
  const { user, getLocalUsers } = useAuthStore()
  const allUsers = getLocalUsers()
  const profileUser = allUsers.find(u => u.username === username) || null

  if (!profileUser) {
    return (
      <PageTransition>
        <div className="flex flex-col items-center justify-center py-24 text-center px-8">
          <p className="font-display text-display-lg text-text-muted">User not found.</p>
          <p className="text-sm font-body text-text-muted mt-2">@{username} does not exist in the signal.</p>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <ProfileHeader profileUser={profileUser} />
      <ProfilePostGrid userId={profileUser.id} />
    </PageTransition>
  )
}
