import Head from 'next/head'
import { getModulesPage, getSocialLinks, getHeaderMenu, getFooterMenu, getTestimonials, getFaqs } from '../lib/api'
import Layout from '../components/Layout'

import stylesGlobal from '../styles/common/Common.module.scss'
import styles from '../styles/CourseModules.module.scss'
import Link from 'next/link'

import Carousel from 'react-multi-carousel'

import Accordion from '../components/Accordion'


export default function InnerCourse({ modulesPage: { title, courseFields }, socials, headermenu, footermenu, preview, testimonials, faqs }) {
  const pageFeatureImge = courseFields.featuredImage.sourceUrl

  console.log(courseFields.onlineCoursesSchedule)

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

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

        <section className={styles.testimonials}>
          <h2>Hear it from our students</h2>

          {testimonials &&
            <Carousel
              responsive={responsive}
              ssr
              className={styles.testimonialSlider}
              slidesToSlide={1}
              infinite
              arrows={false}
              dotListClass=""
              renderButtonGroupOutside={false}
              renderDotsOutside
              showDots
            >
              {testimonials.nodes.map((testimonial, index) => (

                <div className={styles.slideItem} key={index}>
                  <iframe width="364" height="202" src={testimonial.testimonials_customField.testimonialVideo} frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  <div className={styles.rightSide}>
                    <p>{testimonial.testimonials_customField.testimonialCopy}
                      <span>{testimonial.testimonials_customField.nameAndLocation}</span>
                    </p>
                  </div>

                </div>
              ))}
            </Carousel>
          }
        </section>

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


export async function getStaticProps({ preview = false }) {
  const modulesPage = await getModulesPage("150")
  const testimonials = await getTestimonials(preview)
  const faqs = await getFaqs(preview)
  const socials = await getSocialLinks()
  const headermenu = await getHeaderMenu()
  const footermenu = await getFooterMenu()

  return {
    props: { modulesPage, socials, headermenu, footermenu, preview, testimonials, faqs },
  }
}  