import Head from 'next/head'
import { getPage, getAllTeachers, getSocialLinks, getHeaderMenu, getFooterMenu } from '../lib/api'
import Layout from '../components/Layout'

import stylesGlobal from '../styles/common/Common.module.scss'
import styles from '../styles/Teachers.module.scss'
import Link from 'next/link'

export default function Teachers({ teachersPage: { content, featuredImage, title }, teachers, socials, headermenu, footermenu, preview }) {
  const pageFeatureImge = featuredImage.node.sourceUrl

  return (
    <>
      <Layout preview={preview} socials={socials} headermenu={headermenu} footermenu={footermenu}>

        <Head>
          <title>Ipsalu Tantra Teachers</title>
        </Head>

        <div className={stylesGlobal.feature_header}>

          {title && (
            <h1>{title}</h1>
          )}

          {featuredImage && (
            <img src={pageFeatureImge} alt="" />
          )}

        </div>



        <div className={stylesGlobal.page_content}>

          {content && (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          )}

          {teachers && 
          <section className={styles.allTeachers}>           
         
              {teachers.nodes.map( (teacher, index) => (
                <div className={styles.teacherContainer} key={index}>
                  <div className={styles.teacherImageContainer} >
                    <img className={styles.teacherImage} src={teacher.teacherFields.profilePicture.sourceUrl} alt={teacher.title}/>
                    <div className={styles.hoverContainer}>
                        <img className={styles.hoverImage} src="/teacherOver.svg" alt="teacher hover"/>
                        <div className={styles.socialLinks}>
                          <a href={teacher.teacherFields.facebookUrl} target="_blank" ><img src="/facebook.svg" alt="facebook icon" /></a>
                          <a href={` mailto:${teacher.teacherFields.emailAddress}` } target="_blank" ><img src="/email.svg" alt="email icon" /></a>
                        </div>
                    </div>
                  </div>
                  <label className={styles.teacherName}>{teacher.title}</label>
                  <label className={styles.teacherRole}>{teacher.teacherFields.role}</label>
                  <Link href={`./${teacher.id}`}>
                    <a className="pillbutton">
                      View Profile
                    </a>
                  </Link>
                </div>
              ))}

              </section>
          }

         </div>
  

      </Layout>
    
    </>
  )
}


export async function getStaticProps({ preview = false }) {
  const teachersPage = await getPage("208")
  const teachers = await getAllTeachers()
  const socials = await getSocialLinks()
  const headermenu = await getHeaderMenu()
  const footermenu = await getFooterMenu()

  return {
    props: { teachersPage, teachers, socials, headermenu, footermenu, preview },
  }
}  