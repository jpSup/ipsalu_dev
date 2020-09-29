import Head from 'next/head'
import { getPage, getAllModulesForSchool, getSocialLinks, getHeaderMenu, getFooterMenu } from '../lib/api'
import Layout from '../components/Layout'
import stylesGlobal from '../styles/common/Common.module.scss'
import styles from '../styles/Yogicpath.module.scss'
import Link from 'next/link'

export default function yogicpath({ home: { content, featuredImage, title }, courses, socials, headermenu, footermenu, preview }) {
  const homePageFeatureImge = featuredImage.node.sourceUrl

  return (
    <>
      <Layout preview={preview} socials={socials} headermenu={headermenu} footermenu={footermenu}>

        <Head>
          <title>The Yogic Path</title>
        </Head>

        <div className={stylesGlobal.feature_header}>

          {title && (
            <h1>{title}</h1>
          )}

          {featuredImage && (
            <img src={homePageFeatureImge} alt="" />
          )}

        </div>



        <div className={stylesGlobal.page_content}>

          {content && (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          )}


          <div className={styles.four_modules_container}>
            <div className={`${styles.circle_container} ${styles.top_left}`}>
              <img src="https://habitek.co.za/wp/wp-content/uploads/2020/09/Group-650.png" alt="tantra sexuality icon" />
              <h3>Tantra Sexuality Module</h3>
              <h6>8 courses</h6>
              <Link href="#">
                <a>Explore</a>
              </Link>
            </div>

            <div className={`${styles.circle_container} ${styles.top_right}`}>
              <img src="https://habitek.co.za/wp/wp-content/uploads/2020/09/Group-674.png" alt="tantra sexuality icon" />
              <h3>Tantra Sexuality Module</h3>
              <h6>8 courses</h6>
              <Link href="#">
                <a>Explore</a>
              </Link>
            </div>

            <div className={`${styles.circle_container} ${styles.bot_left}`}>
              <img src="https://habitek.co.za/wp/wp-content/uploads/2020/09/Group-673.png" alt="tantra sexuality icon" />
              <h3>Tantra Sexuality Module</h3>
              <h6>8 courses</h6>
              <Link href="#">
                <a>Explore</a>
              </Link>
            </div>

            <div className={styles.blank_container}>
              <h3>Tantra Yoga Module</h3>
              <h6>24 levels of Tantra Yoga towards becoming a higher Yogi</h6>
              <Link href="#">
                <a className="pillbutton">Explore</a>
              </Link>
            </div>

          </div>

          <section className={styles.modules_listing}>

            
            {/* modules && (

              modules.edges.sort((a, b) => (a.node.position > b.node.position) ? 1 : -1).map((amodule, index) => (
                <div className={styles.module} key={index}>
                  <img src={amodule.node.featuredImage.node.sourceUrl} alt={amodule.node.featuredImage.node.altText} />
                  <div className={styles.copy_block_right}>
                    <h3>{amodule.node.title}</h3>
                    <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: amodule.node.excerpt }} />
                  </div>
                </div>
              )
              )) */}

              {
                courses && (
                  courses.edges.map( ( course, index )=> (
                    <div className={styles.module} key={index}>
                      <img src={course.node.courseFields.thumbnailImage.sourceUrl} alt={course.node.title} />
                      <div className={styles.copy_block_right}>
                        <h3>{course.node.title}</h3>
                        <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: course.node.courseFields.shortDescription }} />
                      </div>
                    </div>
 
                  )
                )
              )}

          </section>

        </div>

      </Layout>
    </>
  )
}


export async function getStaticProps({ preview = false }) {
  const home = await getPage("5")
  const courses = await getAllModulesForSchool(preview)
  const socials = await getSocialLinks()
  const headermenu = await getHeaderMenu()
  const footermenu = await getFooterMenu()

  return {
    props: { home, courses, socials, headermenu, footermenu, preview },
  }
}