import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Header.module.scss'


const Header = ( { menu } ) => {  

    const [isSticky, setSticky] = useState(false);
    
    
    const handleScroll = () => {
        setSticky(window.scrollY >150 );        
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };

    }, []);

    return (
        <header className={` ${styles.header} ${isSticky ? styles.fixed : ''} `} >

            <div className={styles.header_content_container}>
                
                <div className={styles.header_content_container__left}>
                    <Link href="/" >
                        <a>
                            <img src="https://habitek.co.za/wp/wp-content/uploads/2020/09/logo.png" alt="Ipsalu logo" />
                        </a>
                    </Link>
                    
                    <div className={styles.logo_copy_container}>
                        <h1>Ipsalu Tantra</h1>
                        <h6>International</h6>
                    </div>
                </div>

                <div className={styles.header_content_container__right}>
                    { menu.menuItems && 
                    <nav>
                        { menu.menuItems.nodes.map( (menuItem, index) => (                        
                                    <Link href={menuItem.url} key={index} >
                                        <a>{menuItem.label}</a>
                                    </Link>                        
                            ))
                        }
                    </nav>                
                    }
                
                </div>

            </div>
        
        </header>
    )
}


export default Header