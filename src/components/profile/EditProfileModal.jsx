import { useState } from 'react'
import { Modal } from '../ui/Modal.jsx'
import { Input, Textarea } from '../ui/Input.jsx'
import { Button } from '../ui/Button.jsx'
import { useAuthStore } from '../../store/authStore.js'
import { useUIStore } from '../../store/uiStore.js'

export function EditProfileModal({ open, onClose }) {
  const { user, updateProfile } = useAuthStore()
  const pushToast = useUIStore(s => s.pushToast)
  const [fields, setFields] = useState({
    displayName: user?.displayName || '',
    bio: user?.bio || '',
  })

  function handleChange(e) {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSave() {
    if (!fields.displayName.trim()) return
    updateProfile({ displayName: fields.displayName.trim(), bio: fields.bio.trim() })
    pushToast('Profile updated.')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Edit Profile">
      <div className="space-y-4">
        <Input
          label="Display Name"
          name="displayName"
          value={fields.displayName}
          onChange={handleChange}
          maxLength={50}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono tracking-widest uppercase text-text-muted">Bio</label>
          <textarea
            name="bio"
            value={fields.bio}
            onChange={handleChange}
            maxLength={160}
            rows={3}
            className="
              w-full bg-surface-primary border-2 border-border-default
              px-4 py-3 text-sm font-body text-text-primary
              placeholder:text-text-muted resize-none
              focus:outline-none focus:border-border-strong
              transition-colors duration-150
            "
            placeholder="Tell the signal who you are."
          />
          <span className="text-xs font-mono text-text-muted text-right">{160 - fields.bio.length}</span>
        </div>
        <div className="flex gap-2 pt-2">
          <Button variant="secondary" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={handleSave} className="flex-1">Save</Button>
        </div>
      </div>
    </Modal>
  )
}
