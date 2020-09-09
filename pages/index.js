import Head from 'next/head'
import { getPage, getAllModulesForHome, getSocialLinks, getHeaderMenu, getFooterMenu } from '../lib/api'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import {useEffect} from 'react'

export default function Index({ home: { content, featuredImage, title }, modules, socials, headermenu, footermenu, preview }) {
  const homePageFeatureImge = featuredImage.node.sourceUrl

  useEffect(()=>{
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
  },[])

  return (
    <>
      <Layout preview={preview} socials={socials} headermenu={headermenu} footermenu={footermenu}>

        <Head>
          <title>Home Page</title>
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        </Head>

        <div className={styles.feature_header}>

          {title && (
            <h1>{title}</h1>
          )}

          {featuredImage && (
            <img src={homePageFeatureImge} alt="" />
          )}

        </div>



        <div className={styles.page_content}>

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
                <a className={styles.pillbutton}>Explore</a>
              </Link>
            </div>

          </div>

          <section className={styles.modules_listing}>

            {modules && (

              modules.edges.sort((a, b) => (a.node.position > b.node.position) ? 1 : -1).map((amodule, index) => (
                <div className={styles.module} key={index}>
                  <img src={amodule.node.featuredImage.node.sourceUrl} alt={amodule.node.featuredImage.node.altText} />
                  <div className={styles.copy_block_right}>
                    <h3>{amodule.node.title}</h3>
                    <div className={styles.excerpt} dangerouslySetInnerHTML={{ __html: amodule.node.excerpt }} />
                  </div>
                </div>
              )
              ))}

          </section>

          <section className={styles.keep_in_touch}>

            <h3>Keep in touch!</h3>
            <p>Leave your name and email and get updates about our retreats and courses around the world. You can unsubscribe any time.</p>
            <div className={styles.form_container} >

              <div className={styles.container_horizontal}>

                <div className={styles.form_field}>
                  <label htmlFor="name">Your first name* </label>
                  <input type="text" name="name" id="name" required />
                </div>

                <div className={styles.form_field}>
                  <label htmlFor="email">Your email* </label>
                  <input type="email" name="name" id="email" required />
                </div>

              </div>

              <div className={styles.form_field}>
                <input type="checkbox" id="tcs" name="tcs" />
                <label htmlFor="tcs">I agree with the </label>
                <Link href="#">
                  <a className={styles.text_link}>Privacy Policy</a>
                </Link>
              </div>

              <div className={styles.form_field}>
                <input type="submit" value="Send" />
              </div>


            </div>

          </section>

        </div>

      </Layout>
    </>
  )
}


export async function getStaticProps({ preview = false }) {
  const home = await getPage("5")
  const modules = await getAllModulesForHome(preview)
  const socials = await getSocialLinks()
  const headermenu = await getHeaderMenu()
  const footermenu = await getFooterMenu()

  return {
    props: { home, modules, socials, headermenu, footermenu, preview },
  }
}