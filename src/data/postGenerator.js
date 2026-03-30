import { mockUsers } from './mockUsers.js'

const contentTemplates = [
  'The signal is getting weaker. The noise is getting louder. This is not an accident. #signal #noise',
  'Every platform starts as a tool. It ends as an environment. The distinction matters. #platform #environment',
  'Observation: the most important conversations never trend. The algorithm is not neutral. #algorithm #trending',
  'If your attention were a currency, social media would be the most predatory bank in existence. #attention #economy',
  'The feed is a mirror. But it\'s a mirror designed to make you scroll. #feed #psychology',
  'Real-time updates create the illusion of understanding. Speed is not clarity. #realtime #clarity',
  'The ghost in the machine isn\'t haunting you. It\'s optimising you. #algorithm #ghost',
  'Three things social media monetises: attention, anxiety, and aspiration. #social #business',
  'The loop runs whether or not you engage. Your absence is also data. #loop #data #surveillance',
  'Notification as interrupt. Interrupt as control. This is the architecture of dependency. #notification #ux',
  'What would a feed look like if it optimised for wisdom instead of engagement? #design #ethics',
  'The viral post is not the important post. Rarely. Almost never. #viral #signal',
  'Platform memory is selective. Your memory is emotional. This asymmetry is exploited daily. #memory #platform',
  'You are not the user. You are the product. The user is the advertiser. You know this. #business #model',
  'The scroll is the behaviour. The content is the excuse. #scroll #behavior #ux',
  'Breaking: the outrage cycle has completed another revolution. #news #outrage #cycle',
  'Depth of engagement ≠ quality of engagement. The algorithm does not know the difference. #engagement #quality',
  'Every "feature" is a constraint you didn\'t consent to. #features #consent #platform',
  'The timeline is not chronological. It is curated. Understand this and you understand everything. #timeline #curation',
  'Signal loss accumulates. What you cannot say becomes what you cannot think. #censorship #language #thought',
]

let postCounter = 100

export function generatePost() {
  const user = mockUsers[Math.floor(Math.random() * mockUsers.length)]
  const content = contentTemplates[Math.floor(Math.random() * contentTemplates.length)]
  const hashtags = (content.match(/#[\w]+/g) || []).map(t => t.slice(1).toLowerCase())

  postCounter++
  return {
    id: `p_live_${postCounter}_${Date.now()}`,
    authorId: user.id,
    author: { id: user.id, username: user.username, displayName: user.displayName, avatar: user.avatar, verified: user.verified },
    content,
    hashtags,
    media: null,
    likes: Math.floor(Math.random() * 500),
    likedBy: [],
    comments: [],
    reposts: Math.floor(Math.random() * 120),
    repostedBy: [],
    createdAt: new Date().toISOString(),
    isLive: true,
  }
}
