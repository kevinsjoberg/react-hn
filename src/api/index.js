const BASE_URL = 'https://hacker-news.firebaseio.com/v0'

export const getUser = async (id) => {
  const response = await fetch(`${BASE_URL}/user/${id}.json`)
  const user = await response.json()

  return user
}

export const getUserStories = async (user) => {
  const stories = await Promise.all(user.submitted.map(id => getStory(id)))

  return stories
    .filter(story => !story.deleted && story.type !== 'comment')
}

export const getStory = async (id) => {
  const response = await fetch(`${BASE_URL}/item/${id}.json`)
  const story = await response.json()

  return story
}

export const getStoryComments = async (story) => {
  const comments = await Promise.all(story.kids.map(id => getStory(id)))

  return comments
}

export const getTopStories = async () => {
  const response = await fetch(`${BASE_URL}/topstories.json`)
  const storyIds = await response.json()
  const stories = await Promise.all(storyIds.slice(0, 30).map(id => getStory(id)))

  return stories
}

export const getNewStories = async () => {
  const response = await fetch(`${BASE_URL}/newstories.json`)
  const storyIds = await response.json()
  const stories = await Promise.all(storyIds.slice(0, 30).map(id => getStory(id)))

  return stories
}
