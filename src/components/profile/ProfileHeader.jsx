import { useState } from 'react'
import { CheckCircle, Settings } from 'lucide-react'
import { Avatar } from '../ui/Avatar.jsx'
import { Button } from '../ui/Button.jsx'
import { Badge } from '../ui/Badge.jsx'
import { EditProfileModal } from './EditProfileModal.jsx'
import { useAuthStore } from '../../store/authStore.js'
import { formatCount, formatDate } from '../../utils/formatters.js'

export function ProfileHeader({ profileUser }) {
  const [editOpen, setEditOpen] = useState(false)
  const { user, toggleFollow, followedUsers } = useAuthStore()
  const isOwn = user?.id === profileUser?.id
  const isFollowed = followedUsers.has(profileUser?.id)

  return (
    <div>
      {/* Cover */}
      <div
        className="h-32 lg:h-40 border-b-2 border-border-default"
        style={{
          background: 'repeating-linear-gradient(45deg, var(--surface-secondary) 0px, var(--surface-secondary) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(-45deg, var(--border-default) 0px, var(--border-default) 1px, transparent 1px, transparent 20px)',
        }}
      />

      {/* Avatar + actions row */}
      <div className="px-5 pb-4">
        <div className="flex items-end justify-between -mt-8 mb-4">
          <div className="border-4 border-surface-primary">
            <Avatar src={profileUser?.avatar} alt={profileUser?.displayName} size="xl" />
          </div>
          <div className="mt-2">
            {isOwn ? (
              <Button variant="secondary" size="sm" onClick={() => setEditOpen(true)}>
                <Settings size={14} />
                Edit Profile
              </Button>
            ) : (
              <Button
                variant={isFollowed ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => toggleFollow(profileUser.id)}
              >
                {isFollowed ? 'Following' : 'Follow'}
              </Button>
            )}
          </div>
        </div>

        {/* Name + bio */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-display-md font-bold text-text-primary">
              {profileUser?.displayName}
            </h1>
            {profileUser?.verified && (
              <CheckCircle size={16} className="text-text-muted" />
            )}
            {profileUser?.verified && <Badge variant="outline">VERIFIED</Badge>}
          </div>
          <p className="text-sm font-mono text-text-muted">@{profileUser?.username}</p>
          {profileUser?.bio && (
            <p className="text-sm font-body text-text-secondary max-w-md">{profileUser.bio}</p>
          )}
          <p className="text-xs font-mono text-text-muted">
            Joined {profileUser?.joinedAt ? formatDate(profileUser.joinedAt, 'MMMM yyyy') : '—'}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex border-t-2 border-b-2 border-border-default">
        {[
          { label: 'Posts',    value: profileUser?.postsCount || 0 },
          { label: 'Followers', value: profileUser?.followers || 0 },
          { label: 'Following', value: profileUser?.following || 0 },
        ].map(({ label, value }) => (
          <div key={label} className="flex-1 flex flex-col items-center py-4 border-r-2 border-border-default last:border-r-0">
            <span className="font-display text-display-md font-bold text-text-primary">{formatCount(value)}</span>
            <span className="text-xs font-mono tracking-widest uppercase text-text-muted mt-0.5">{label}</span>
          </div>
        ))}
      </div>

      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  )
}
