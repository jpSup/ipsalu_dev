import Head from 'next/head'
import { getModulesPage, getSocialLinks, getHeaderMenu, getFooterMenu, getTestimonials, getFaqs } from '../../lib/api'
import Layout from '../../components/Layout'

import stylesGlobal from '../../styles/common/Common.module.scss'
import styles from '../../styles/CourseModules.module.scss'
import Link from 'next/link'

import Testimonials from "../../components/Testimonial/Testimonials"


import Accordion from '../../components/Accordion'

import { useRouter } from 'next/router'


export default function course({ modulesPage: { courseFields }, socials, headermenu, footermenu, preview, testimonials, faqs }) {
  const router = useRouter()


  if (router.isFallback) {
    return <div>Loading...</div>
  }
  console.log(courseFields)

  const pageFeatureImge = courseFields.featuredImage.sourceUrl

  return (
    <>
      <Layout preview={preview} socials={socials} headermenu={headermenu} footermenu={footermenu}>

        <Head>
          <title>{courseFields.innerPageTitle}</title>
        </Head>

        <div className={stylesGlobal.feature_header}>

          {courseFields.innerPageTitle && (
            <h1>{courseFields.innerPageTitle}
              {courseFields.innerPageShortDescription && (
                <span>{courseFields.innerPageShortDescription}</span>
              )}
            </h1>
          )}



          {pageFeatureImge && (
            <img src={pageFeatureImge} alt="" />
          )}

        </div>


        <div className={stylesGlobal.page_content}>

          {courseFields.modulesRepeater &&
            <section className={styles.allModules}>

              {courseFields.modulesRepeater.map((module, index) => (

                <div className={styles.courseContainer} key={index}>
                  <img src={module.moduleThumbnail.sourceUrl} alt={module.moduleTitle} />
                  <div className={styles.courseInfoContainer}>
                    <h2 className={styles.courseTitle}>{module.moduleTitle} </h2>
                    <p className={styles.courseDescription} >
                      {module.moduleShortDescription}
                    </p>
                    <Link href="#" >
                      <a >
                        view details
                          </a>
                    </Link>
                  </div>
                </div>

              ))}

            </section>
          }

          {courseFields.onlineCoursesSchedule &&
            
            (
              <section className={styles.allYouNeedToKnowContainer} style={{ backgroundImage: "url(/custom/onlinecourseschedule.png)" }} >
                <div className={styles.contentContainer}>
                  <h2>{courseFields.onlineCoursesSchedule.courseTitle}</h2>
                  <p>
                    {courseFields.onlineCoursesSchedule.onlineCoursesScheduleCopy}
                  </p>

                  <div className={styles.timesList}>

                    {courseFields.onlineCoursesSchedule.onlineCoursesRepeater.map((schedule, index) => (
                      <div key={index}><span>{schedule.courseTime}</span>{schedule.courseTitle}</div>
                    ))}

                  </div>


                </div>

              </section>

            )
          }



        </div>

        <Testimonials testimonials={ testimonials } />

        <div className="section__spacer"></div>

        <section className={styles.faqs}>
          <h2>Your Questions Answered</h2>

          {faqs &&
            faqs.nodes.map((faq, index) => (
              <Accordion
                key={index}
                title={faq.faqCustomFields.question}
                content={faq.faqCustomFields.answer}
              />
            ))
          }
        </section>

        <div className="section__spacer"></div>

      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  return {
    // Only `/course/150` and `/course/167` are generated at build time
    paths: [{ params: { courseid: '150' } }],
    // Enable statically generating additional pages
    fallback: true,
  }
}


export async function getStaticProps({ preview = false, params }) {
  
  const modulesPage = await getModulesPage(params.courseid)
  
  const testimonials = await getTestimonials(preview)
  const faqs = await getFaqs(preview)
  const socials = await getSocialLinks()
  const headermenu = await getHeaderMenu()
  const footermenu = await getFooterMenu()

  return {
    props: { modulesPage, socials, headermenu, footermenu, preview, testimonials, faqs },
    revalidate: 1,
  }
}  