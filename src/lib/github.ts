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
  description: string
  html_url: string
  language: string
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics: string[]
}

export async function fetchGitHubProfile(username: string = 'shemaarafati2020'): Promise<GitHubProfile> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`)
    if (!response.ok) throw new Error('Failed to fetch GitHub profile')
    return await response.json()
  } catch (error) {
    console.error('Error fetching GitHub profile:', error)
    throw error
  }
}

export async function fetchGitHubRepos(username: string = 'shemaarafati2020'): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
    if (!response.ok) throw new Error('Failed to fetch GitHub repos')
    return await response.json()
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    throw error
  }
}
