
import styles from "../UpcomingCourses/UpcomingCourses.module.scss"
import Carousel from "react-multi-carousel"
import moment from 'moment'
import Link from 'next/link'

const UpcomingCourses = ({ upcomingcourses }) => {

    
    const dateFiltered = upcomingcourses.nodes.filter( item => {        
        if ( moment(item.eventFields.eventStartDate).diff( moment() ) > 1 ) { return true}
        return false
    })


    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            partialVisibilityGutter: 40
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    }

    return (
        <section className={styles.upcomingcourses}>
            <h2>Upcoming Courses</h2> 

            {dateFiltered &&
                <Carousel
                    responsive={responsive}
                    partialVisible
                    infinite
                    ssr
                    className={styles.upcomingcoursesSlider}
                    slidesToSlide={1}
                    infinite
                    arrows
                    dotListClass=""
                    renderButtonGroupOutside={false}
                    renderDotsOutside
                    showDots
                    
                >
                    {dateFiltered.map((upcomingcourse, index) => (

                        <div className={styles.slideItem} key={index}>
                            <div className={styles.eventsBox} key={index} style={{ backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0) 30%, rgba(255,255,255,1) 60%), url( ${upcomingcourse.eventFields.sliderImage !== null ? upcomingcourse.eventFields.sliderImage.sourceUrl : "" })` }}>
                                <div className={styles.content}>
                                    <h2>{upcomingcourse.title}</h2>
                                    <h6>{upcomingcourse.eventFields.eventSubtitle}</h6>
                                    <div className={styles.location}>
                                        <span className={styles.icon}>
                                            <img src="/location.svg" alt="location icon" />
                                        </span>
                                        <label>{upcomingcourse.eventFields.eventLocation}</label>
                                    </div>
                                    <div className={styles.dateTime}>
                                        <span className={styles.icon}>
                                            <img src="/calendar.svg" alt="calendar icon" />
                                        </span>
                                        <label>{`${moment(upcomingcourse.eventFields.eventStartDate, "YYYY-MM-DD").format('DD')} ${moment(upcomingcourse.eventFields.eventStartDate, "YYYY-MM-DD").format('MMMM')} - ${moment(upcomingcourse.eventFields.eventEndDate, "YYYY-MM-DD").format('DD')} ${moment(upcomingcourse.eventFields.eventEndDate, "YYYY-MM-DD").format('MMMM')} ${moment(upcomingcourse.eventFields.eventEndDate, "YYYY-MM-DD").format('YYYY')} `}</label>
                                        <span className={styles.days}>{`( ${moment(upcomingcourse.eventFields.eventEndDate).diff(moment(upcomingcourse.eventFields.eventStartDate), 'days')} days )`}</span>
                                    </div>
                                    <Link href="#">
                                        <a className="pillbutton">Learn More</a>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    ))}
                </Carousel>
            }
        </section>
    )
}

export default UpcomingCourses

