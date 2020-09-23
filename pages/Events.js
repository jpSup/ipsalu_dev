import Head from 'next/head'
import { getEventsPage, getEvents, getSocialLinks, getHeaderMenu, getFooterMenu } from '../lib/api'
import Layout from '../components/Layout'

import stylesGlobal from '../styles/common/Common.module.scss'
import styles from '../styles/Events.module.scss'
import Link from 'next/link'

export default function Events({ content, events, socials, headermenu, footermenu, preview, testimonials }) {

    return (
        <>
            <Layout preview={preview} socials={socials} headermenu={headermenu} footermenu={footermenu}>

                <Head>
                    <title>Events Page</title>
                </Head>

                <div className={ `${stylesGlobal.feature_header} ${styles.feature_header}` }>
                    {content.eventPageFields.title && (
                        <h1>{content.eventPageFields.title}</h1>
                    )}

                    {content.eventPageFields.headerImage.sourceUrl && (
                        <img src={content.eventPageFields.headerImage.sourceUrl} alt="header image events" />
                    )}

                    <div className={styles.filterContainer}>
                        <div className={styles.filterTopBar}>
                            <label>Filter</label>
                        </div>
                        <div className={styles.filterChoices}>
                            <p>Filter by Courses</p>
                            <div className={styles.filterOption}>
                                <input type="checkbox" value="courseID1" />
                                <label> Tantra Yoga Module</label>
                            </div>
                            <div className={styles.filterOption}>
                                <input type="checkbox" value="courseID2" />
                                <label> Taste of Tantra Course</label>
                            </div>
                            <div className={styles.filterOption}>
                                <input type="checkbox" value="courseID3" />
                                <label> Teacher Trainings Module</label>
                            </div>
                            <div className={styles.filterOption}>
                                <input type="checkbox" value="courseID4" />
                                <label> Metaphysics Module</label>
                            </div>
                            <div className={styles.filterOption}>
                                <input type="checkbox" value="courseID5" />
                                <label> Tantra Sexuality Module</label>
                            </div>
                        </div>
                        <div className={styles.actionBtns}>
                            <button className={stylesGlobal.secondaryButton}>Resest all filters</button>
                            <button className={stylesGlobal.primaryButton}>Filter courses</button>
                        </div>
                    </div>
                </div>



                <div className={stylesGlobal.page_content}>

                    <section className={styles.eventsRepeaterContainer} >


                        {events && 
                            (
                                events.nodes.map((eventItem, index) => (
                                    <div className={styles.eventsBox} key={index} style={{ backgroundImage: `url(${eventItem.eventFields.eventThumbnail.sourceUrl})`}}>
                                        <div className={styles.content}>
                                            <h2>{eventItem.title}</h2>
                                            <h6>{eventItem.eventFields.eventSubtitle}</h6>
                                            <div className={styles.location}>
                                                <span className={styles.icon}>
                                                    <img src="/location.svg" alt="location icon" />
                                                </span>
                                                <label>{eventItem.eventFields.eventLocation}</label>
                                            </div>
                                            <div className={styles.dateTime}>
                                                <span className={styles.icon}>
                                                    <img src="/calendar.svg" alt="calendar icon" />
                                                </span>
                                    <label>{ `${eventItem.eventFields.eventStartDate} - ${eventItem.eventFields.eventEndDate} ` }</label>
                                                <span className={styles.days}>(4 days)</span>
                                            </div>
                                        </div>
                                    </div>

                                ))
                            )
                        }


                    </section>

                </div>

            </Layout>
        </>
    )
}


export async function getStaticProps({ preview = false }) {


    const content = await getEventsPage("272")
    const events = await getEvents()
    const socials = await getSocialLinks()
    const headermenu = await getHeaderMenu()
    const footermenu = await getFooterMenu()

    return {
        props: { content, events, socials, headermenu, footermenu, preview },
    }
}