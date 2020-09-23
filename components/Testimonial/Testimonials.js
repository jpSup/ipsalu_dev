
import styles from "../Testimonial/Testimonials.module.scss"
import Carousel from "react-multi-carousel"

const Testimonials = ({ testimonials }) => {

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
    )
}

export default Testimonials