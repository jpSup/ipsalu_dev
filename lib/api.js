const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getPreviewPost(id, idType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  )
  return data.post
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.posts
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            content
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.posts
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug))
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug
  const isDraft = isSamePost && postPreview?.status === 'draft'
  const isRevision = isSamePost && postPreview?.status === 'publish'
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
    // Only some of the fields of a revision are considered as there are some inconsistencies
    isRevision
      ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
      : ''
    }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? 'DATABASE_ID' : 'SLUG',
      },
    }
  )

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node

    if (revision) Object.assign(data.post, revision)
    delete data.post.revisions
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug)
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop()

  return data
}


export async function getPage(id, idType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `
    query Page($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        content
        featuredImage {
          node {
            sourceUrl(size: LARGE)
          }
        }
        title
      }
    }`,
    {
      variables: { id, idType },
    }
  )

  return data.page
}


export async function getAllModulesForSchool(preview) {
  const data = await fetchAPI(
    `query getCourses {
      courses(first: 4) {
        edges {
          node {
            courseFields {
              thumbnailImage {
                sourceUrl
              }
              shortDescription
            }
            title
          }
        }
      }
    }    
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.courses
}



export async function getSocialLinks() {
  const data = await fetchAPI(
    `query GetSocials {
      socials {
        nodes {
          title
          link
          socialCustomFields {
            socialIcon {
              sourceUrl
            }
          }
        }
      }
    }
  `
  )

  return data?.socials
}



export async function getFooterMenu() {
  const data = await fetchAPI(
    `query GetFooterMenu {
      menu(id: "3", idType: DATABASE_ID) {
        menuItems {
          nodes {
            url
            label
          }
        }
      }
    }
  `
  )

  return data?.menu
}


export async function getHeaderMenu() {
  const data = await fetchAPI(
    `query GetHeaderMenu {
      menu(id: "4", idType: DATABASE_ID) {
        menuItems {
          nodes {
            url
            label
          }
        }
      }
    }
  `
  )

  return data?.menu
}


/* Teachers Page */

export async function getAllTeachers(preview) {
  const data = await fetchAPI(
    `query GetAllTeachers {
      teachers {
        nodes {
          title
          id
          teacherFields {
            emailAddress
            facebookUrl
            role
            profilePicture {
              sourceUrl
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.teachers
}


/* Courses Page */

export async function getAllCourses(preview) {
  const data = await fetchAPI(
    `query GetAllCourses {
      courses {
        nodes {
          courseFields {
            thumbnailImage {
              sourceUrl
            }
            shortDescription
            subtitle
          }
          title
          id
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.courses
}

/* Modules Page */

export async function getModulesPage(id, idType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `query getModulesPage($id: ID!, $idType: CourseIdType!) {
      course(id: $id, idType: $idType) {
        title
        courseFields {
          featuredImage {
            sourceUrl
          }
          innerPageTitle
          innerPageShortDescription
          modulesRepeater {
            moduleShortDescription
            moduleTitle
            moduleThumbnail {
              sourceUrl
            }
          }
          onlineCoursesSchedule {
            courseTitle
            onlineCoursesScheduleCopy
            onlineCoursesRepeater {
              courseTime
              courseTitle
            }
          }
        }
      }
    }`,
    {
      variables: { id, idType },
    }
  )

  return data?.course
}


/* get All testimonials */

export async function getTestimonials(preview) {
  const data = await fetchAPI(
    `query getTestimonials {
      testimonials {
        nodes {
          testimonials_customField {
            nameAndLocation
            testimonialCopy
            testimonialVideo
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.testimonials
}

/* get All Faqs */

export async function getFaqs(preview) {
  const data = await fetchAPI(
    `query getFaqs {
      faqs {
        nodes {
          faqCustomFields {
            answer
            question
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.faqs
}

export async function getHomePage(id, idType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `query Page($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        home_pageCustomFields {
          featureCaption
          featureImageTopOfPage {
            sourceUrl
          }
          zone2Content {
            content
            title
          }
          zone4BackgroundImage {
            sourceUrl
          }
          zone4ExploreCourse {
            ... on Course {
              id
              courseFields {
                innerPageTitle
                courseDeliveryFormat
                courseModuleRelationship
                courseStartingFromPrice
                courseStartDate
                courseEndDate
              }
            }
          }
        }
      }
    }`,
    {
      variables: { id, idType },
    }
  )

  return data.page
}


/* get All Events */

export async function getEvents(preview) {
  const data = await fetchAPI(
    `query getEvents {
      events {
        nodes {
          title
          eventFields {
            eventEndDate
            eventStartDate
            eventSubtitle
            eventLocation
            sliderImage{
              sourceUrl
            }
            eventThumbnail {
              sourceUrl
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.events
}


/* get the events page */



export async function getEventsPage(id, idType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `query getEventsPage ($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        id
        title
        eventPageFields {
          title
          headerImage {
            sourceUrl
          }
        }
      }
    }`,
    {
      variables: { id, idType },
    }
  )

  return data.page
}

/* get the event inner detail page */

export async function getEventInnerDetail(id, idType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `query getEventInnerDetail ($id: ID!, $idType: EventIdType!) {
      event(id: $id, idType: $idType) {
        id
        eventFields {
          eventEndDate
          eventLocation
          eventShortDescription
          eventStartDate
          eventSubtitle
          fieldGroupName
          eventFeaturedImage {
            sourceUrl
          }
          onlineEventSchedule {
            scheduleText
            title
            scheduleTimeRepeater {
              time
              topic
            }
          }
          onlineEventVenueBoxBackgroundImage {
            sourceUrl
          }
          onlineEventScheduleBoxBackgroundImage {
            sourceUrl
          }
          onlineEventVenue {
            eventFormat
            offeredVia
            venueDescription
          }
          onlineEventTeacher {
            ... on Teacher {
              teacherFields {
                role
                teacherExcerpt
                profilePicture {
                  sourceUrl
                }
              }
              title
            }
          }
          cost
        }
        title
      }
    }
    `,
    {
      variables: { id, idType },
    }
  )

  return data.event
}