import Head from 'next/head'
import { getPage, getAllCourses, getSocialLinks, getHeaderMenu, getFooterMenu } from '../lib/api'
import Layout from '../components/Layout'

import stylesGlobal from '../styles/common/Common.module.scss'
import styles from '../styles/Courses.module.scss'
import Link from 'next/link'

export default function courses({ coursesPage: { content, featuredImage, title }, courses, socials, headermenu, footermenu, preview }) {
  const pageFeatureImge = featuredImage.node.sourceUrl

  return (
    <>
      <Layout preview={preview} socials={socials} headermenu={headermenu} footermenu={footermenu}>

        <Head>
          <title>Courses</title>
        </Head>

        <div className={stylesGlobal.feature_header}>

          {title && (
            <h1>{title}</h1>
          )}

          {featuredImage && (
            <img src={pageFeatureImge} alt="" />
          )}

        </div>


        <div className={stylesGlobal.page_content}>

          {content && (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          )}

          {courses && 
          <section className={styles.allCourses}>           
         
              {courses.nodes.map( (course, index) => (
                <div className={styles.courseContainer} key={index}>
                    <img src={course.courseFields.thumbnailImage.sourceUrl} alt={course.courseFields.title} />
                    <div className={styles.courseInfoContainer}>
                        <h2 className={styles.courseTitle}>{course.title} </h2>
                        <h3 className={styles.courseSubTitle}>{course.courseFields.subtitle} </h3>
                        <p className={styles.courseDescription} >
                            {course.courseFields.shortDescription}
                        </p>
                        <Link href={`./${course.id}`} as={course.title}>
                            <a className="pillbutton">
                                Learn More
                            </a>
                        </Link>
                    </div>
                   
                                     
                </div>
              ))}

              </section>             
          }

        </div>

        <section className={styles.exploreContainer}>
            <div className={styles.left}>
                <h2>Explore <br/>
                    <span>other modules</span>
                </h2>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut dolor dignissim, pulvinar nisl sit amet, facilisis lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut convallis eros. Ut lacinia viverra faucibus. Nam ultricies cursus nunc laoreet vulputate. Integer posuere a magna ac vulputate. Praesent at ex posuere, condimentum magna ut, cursus tortor.
                </p>
                <Link href="#">
                    <a className="pillbutton">
                      Learn More
                    </a>
                </Link>
                
            </div>
            <div className={styles.right}>
                <img src="/custom/explore-other.png" alt="explore other modules" />
                <div className={styles.rightContent}>
                    
                    <div className={styles.contentItem}>
                        <h3>Tantra Sexuality Module</h3>
                        <label>8 courses</label>
                        <Link href="#">
                            <a>EXPLORE</a>
                        </Link>
                    </div>

                    <div className={styles.contentItem}>
                        <h3>Tantra Yoga Module</h3>
                        <label>8 courses</label>
                        <Link href="#">
                            <a>EXPLORE</a>
                        </Link>
                    </div>

                    <div className={styles.contentItem}>
                        <h3>Teacher Trainings</h3>
                        <label>8 courses</label>
                        <Link href="#">
                            <a>EXPLORE</a>
                        </Link>
                    </div>

                </div>
            </div>
        </section>

      </Layout>
    
    </>
  )
}


export async function getStaticProps({ preview = false }) {
  const coursesPage = await getPage("215")
  const courses = await getAllCourses()
  const socials = await getSocialLinks()
  const headermenu = await getHeaderMenu()
  const footermenu = await getFooterMenu()

  return {
    props: { coursesPage, courses, socials, headermenu, footermenu, preview },
  }
}  