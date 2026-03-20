export interface GitHubProfile {
  login: string
  id: number
  avatar_url: string
  name: string
  bio: string
  company: string
  location: string
  blog: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  watchers_count: number
  updated_at: string
  topics: string[]
  fork: boolean
  archived: boolean
  open_issues_count: number
}

const GITHUB_USERNAME = 'shemaarafati2020'

export async function fetchGitHubProfile(username: string = GITHUB_USERNAME): Promise<GitHubProfile> {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 3600 },
    headers: { 'Accept': 'application/vnd.github.v3+json' }
  })
  if (!response.ok) throw new Error('Failed to fetch GitHub profile')
  return response.json()
}

export async function fetchGitHubRepos(username: string = GITHUB_USERNAME): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=30&type=owner`,
    {
      next: { revalidate: 3600 },
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    }
  )
  if (!response.ok) throw new Error('Failed to fetch GitHub repos')
  const repos: GitHubRepo[] = await response.json()
  // Filter out forks and archived, sort by stars then updated
  return repos
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
}

// Language → colour mapping for visual chips
export const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C++': '#f34b7d',
  C: '#555555',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Shell: '#89e051',
  Kotlin: '#A97BFF',
  Swift: '#FA7343',
  Dart: '#00B4AB',
}

export function getLangColor(lang: string | null): string {
  if (!lang) return '#6b7280'
  return LANG_COLORS[lang] || '#4ade80'
}
