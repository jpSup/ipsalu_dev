import Link from 'next/link'
import styles from '../styles/Footer.module.scss'


const Footer = ({ socials, menu }) => (

    <footer className={styles.footer}>

        <div className={styles.footer_inner_container}>

            <div className={styles.left_container}>

                <p> &copy; 2020 Ipsalu Tantra International </p>
                <a href="mailto:info@ipsalutantra.org">info@ipsalutantra.org</a>

                {menu.menuItems &&
                    <nav>
                        {menu.menuItems.nodes.map((menuItem, index) => (
                            <Link href={menuItem.url} key={index} >
                                <a>{menuItem.label}</a>
                            </Link>
                        ))
                        }
                    </nav>
                }

            </div>

            <div className={styles.right_container}>

                {socials &&
                    <nav>
                        {
                            socials.nodes.map((social, index) => (
                                <a key={index} href={social.url} target="_blank">
                                    <img src={social.featuredImage.node.sourceUrl} alt={social.title} />
                                </a>
                            ))
                        }
                    </nav>
                }



            </div>

        </div>
    </footer>
)




export default Footer