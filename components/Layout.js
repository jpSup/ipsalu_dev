import Link from 'next/link'
import Header from './Header'
import Footer from './Footer'
import styles from '../styles/Layout.module.scss'

const Layout = ( { preview, children, socials, headermenu, footermenu} ) => {
  return (
    <>
      <Header menu={ headermenu } />
      <main className={styles.main}>{ children }</main>
      <Footer socials={socials} menu={ footermenu } />
    </>
  )
}

export default Layout