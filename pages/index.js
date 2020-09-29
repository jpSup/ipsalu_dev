import Head from 'next/head'
import { getHomePage, getSocialLinks, getHeaderMenu, getFooterMenu, getTestimonials, getEvents } from '../lib/api'
import Layout from '../components/Layout'
import Testimonials from "../components/Testimonial/Testimonials"
import stylesGlobal from '../styles/common/Common.module.scss'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import moment from 'moment'
import UpcomingCourses from '../components/UpcomingCourses/UpcomingCourses'

export default function index({ home, socials, headermenu, footermenu, preview, testimonials, events }) {

  const courseDateObject = home.home_pageCustomFields.zone4ExploreCourse.courseFields;
  const courseDateRange = `${moment(courseDateObject.courseStartDate, "YYYY-MM-DD").format('DD')} ${moment(courseDateObject.courseStartDate, "YYYY-MM-DD").format('MMMM')} - ${moment(courseDateObject.courseEndDate, "YYYY-MM-DD").format('DD')} ${moment(courseDateObject.courseEndDate, "YYYY-MM-DD").format('MMMM')} ${moment(courseDateObject.courseEndDate, "YYYY-MM-DD").format('YYYY')}`;
  

  return (
    <>
      <Layout preview={preview} socials={socials} headermenu={headermenu} footermenu={footermenu}>

        <Head>
          <title>Home Page</title>
        </Head>

        <div className={stylesGlobal.feature_header}>

          {home.home_pageCustomFields.featureCaption && (
            <div className={stylesGlobal.featureCaptionButton}>
              <h1 className={stylesGlobal.h1WithLinkButton}>{home.home_pageCustomFields.featureCaption}     
              </h1>
              <Link href="#">
                <a className={stylesGlobal.pinkButtonwithOverFlow}>
                  <span>Discover Tantra</span>
                  <img src="/circlarrowicon.svg" alt="circle arrow icon" />
                </a>
              </Link>             
            </div>
          )}

          {home.home_pageCustomFields.featureImageTopOfPage && (
            <img src={home.home_pageCustomFields.featureImageTopOfPage.sourceUrl} alt="" />
          )}

        </div>



        <div className={stylesGlobal.page_content}>

          <section className={styles.centeredContentBlock}>
            <h2>{home.home_pageCustomFields.zone2Content.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: home.home_pageCustomFields.zone2Content.content }} />
          </section>



          <section className={styles.four_modules_container}>
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

          </section>

          <div className="section__spacer"></div>

          <section className={styles.courseExploreContainer} style={{backgroundImage: `url(${home.home_pageCustomFields.zone4BackgroundImage.sourceUrl})` }}>

            <div className={styles.exploreBlock} style={{backgroundImage: `url("/exploreBtmPink.svg")` }}>
              
              <div className={styles.exploreContent}>
                <h2>{ `${home.home_pageCustomFields.zone4ExploreCourse.courseFields.innerPageTitle} Courses, ${home.home_pageCustomFields.zone4ExploreCourse.courseFields.courseDeliveryFormat} `}</h2>
                <p className={styles.partOf}>{ `Part of the ${home.home_pageCustomFields.zone4ExploreCourse.courseFields.courseModuleRelationship} Module`}</p>
                <Link href="#">
                  <a className={styles.pinkLinkUnderline}>
                    Read course description
                  </a>
                </Link>
                <h3>{ `Starting from $${home.home_pageCustomFields.zone4ExploreCourse.courseFields.courseStartingFromPrice}` } </h3>
                <p className={styles.dateRange}>{ courseDateRange }</p>
          <p className={styles.courseFormat}>{ home.home_pageCustomFields.zone4ExploreCourse.courseFields.courseDeliveryFormat === "Online" ? 'Online course, live via Zoom' : 'Venue in description'}</p>
                <Link href="#">
                  <a className={styles.exploreLink} >Explore</a>
                </Link>                
              </div>
             
            </div>

          </section>

          <div className="section__spacer"></div>

          <Testimonials testimonials={ testimonials } />

          <UpcomingCourses upcomingcourses={events} />

        </div>

      </Layout>
    </>
  )
}


export async function getStaticProps({ preview = false }) {
  const home = await getHomePage("233")
  const socials = await getSocialLinks()
  const headermenu = await getHeaderMenu()
  const footermenu = await getFooterMenu()
  const testimonials = await getTestimonials(preview)
  const events = await getEvents()

  return {
    props: { home, socials, testimonials, headermenu, footermenu, preview, events },
  }
}