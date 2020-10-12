import Head from 'next/head'
import { getEventInnerDetail, getSocialLinks, getHeaderMenu, getFooterMenu } from '../lib/api'
import Layout from '../components/Layout'

import stylesGlobal from '../styles/common/Common.module.scss'
import styles from '../styles/EventDetail.module.scss'
import Link from 'next/link'


export default function EventDetail({ content, socials, headermenu, footermenu, preview }) {

    return (
        <>
            <Layout preview={preview} socials={socials} headermenu={headermenu} footermenu={footermenu}>

                <Head>
                    <title>Event Detail Page</title>
                </Head>

                <div className={`${stylesGlobal.feature_header} ${styles.feature_header}`}>

                    {content.eventFields.eventFeaturedImage.sourceUrl && (
                        <img src={content.eventFields.eventFeaturedImage.sourceUrl} alt="header image eventsDetail" />
                    )}

                    <div className={styles.courseExploreContainer}>

                        <div className={styles.exploreBlock} style={{ backgroundImage: `url("/exploreBtmPink.svg")` }}>

                            <div className={styles.exploreContent}>
                                <h2>{content.title}</h2>
                                <p className={styles.partOf}>{content.eventFields.eventSubtitle}</p>
                                <Link href="#">
                                    <a className={styles.pinkLinkUnderline}>
                                        Read course description
                                </a>
                                </Link>
                                <p className={styles.dateRange}>{`${content.eventFields.eventStartDate} - ${content.eventFields.eventEndDate}`}</p>
                                <p className={styles.courseFormat}>{content.eventFields.eventLocation}</p>
                                <Link href="#">
                                    <a className={styles.exploreLink} >Expired</a>
                                </Link>
                            </div>

                        </div>

                    </div>

                </div>

                <div className={stylesGlobal.page_content}>

                    <p className={styles.expiredMessage}>Oh, seems you missed this experience. Just choose another course here and join us.</p>

                    <div className={styles.allYouNeedToKnow}>
                        <h2>All you need to know</h2>
                        <div className={styles.linksList}>
                            <Link href="#">
                                <a>Online Course Schedule</a>
                            </Link>
                            <Link href="#">
                                <a>How to prepare your Zoom</a>
                            </Link>
                            <Link href="#">
                                <a>Technical requirements</a>
                            </Link>
                        </div>


                    </div>

                </div>

                {content.eventFields.onlineEventSchedule &&

                    (
                        <section className={styles.allYouNeedToKnowContainer} style={{ backgroundImage: `url(${content.eventFields.onlineEventScheduleBoxBackgroundImage.sourceUrl})` }} >
                            <div className={styles.contentContainer}>
                                <h2>{content.eventFields.onlineEventSchedule.title}</h2>
                                <p>
                                    {content.eventFields.onlineEventSchedule.scheduleText}
                                </p>

                                <div className={styles.timesList}>

                                    {content.eventFields.onlineEventSchedule.scheduleTimeRepeater.map((schedule, index) => (
                                        <div key={index}><span>{schedule.time}</span>{schedule.topic}</div>
                                    ))}

                                </div>


                            </div>

                        </section>

                    )
                }


                {content.eventFields.onlineEventVenue &&

                    (
                        <section className={styles.venueContainer} style={{ backgroundImage: `url(${content.eventFields.onlineEventVenueBoxBackgroundImage.sourceUrl})` }} >
                            <h2>Venue</h2>
                            <div className={styles.contentContainer}>
                                <h3>{content.eventFields.onlineEventVenue.offeredVia}</h3>
                                <h6>
                                    {content.eventFields.onlineEventVenue.eventFormat}
                                </h6>
                                <div className={styles.innerContent} dangerouslySetInnerHTML={{ __html: `${content.eventFields.onlineEventVenue.venueDescription}` }} >
                                </div>
                                <button className={stylesGlobal.primaryButton}>Sign Up</button>
                            </div>

                        </section>

                    )
                }


                {content.eventFields.onlineEventTeacher && (
                        <section className={styles.classTeacher}>
                            <h1>Teacher</h1>
                            <div className={styles.content}>
                                <div className={styles.contentLeft}>
                                    <h2>{content.eventFields.onlineEventTeacher.title}</h2>
                                    <h6>{content.eventFields.onlineEventTeacher.teacherFields.role}</h6>
                                    <p>{content.eventFields.onlineEventTeacher.teacherFields.teacherExcerpt}</p>
                                    <Link href="#">
                                        <a>
                                        Read more  
                                        </a>
                                    </Link>
                                </div>
                                <img src={content.eventFields.onlineEventTeacher.teacherFields.profilePicture.sourceUrl} alt={content.eventFields.onlineEventTeacher.title} />
                            </div>
                        </section>
                    )
                }

                <section className={styles.courseFeeContainer}>
                    <h1>Course fee</h1>
                    <div className={styles.courseExploreContainer}>

                        <div className={styles.exploreBlock} style={{ backgroundImage: `url("/exploreBtmPink.svg")` }}>

                            <div className={styles.exploreContent}>
                                <h2>{content.title}</h2>
                                <p className={styles.partOf}>{content.eventFields.eventSubtitle}</p>
                                <h3>{content.eventFields.cost}</h3>
                                <p className={styles.dateRange}>{`${content.eventFields.eventStartDate} - ${content.eventFields.eventEndDate}`}</p>
                                <p className={styles.courseFormat}>{content.eventFields.eventLocation}</p>
                                <Link href="#">
                                    <a className={styles.exploreLink} >Buy</a>
                                </Link>
                            </div>

                        </div>

                    </div>


                </section>

                <p className={styles.cancellationCopy}>
                    For cancellation and refunds please carefully read our updated <Link href="#"><a>Terms of Service</a></Link> and <Link href="#"><a>Liability Waiver</a></Link> before making your booking. By making a booking you confirm that you fully accept all terms presented in these documents.
                </p>


            </Layout>
        </>
    )
}


export async function getStaticProps({ preview = false }) {


    const content = await getEventInnerDetail("93")

    const socials = await getSocialLinks()
    const headermenu = await getHeaderMenu()
    const footermenu = await getFooterMenu()

    return {
        props: { content, socials, headermenu, footermenu, preview },
    }
}