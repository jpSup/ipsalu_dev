import Link from 'next/link'
import stylesGlobal from '../../styles/common/Common.module.scss'


const KeepInTouch = () => (

    <section className={stylesGlobal.keep_in_touch}>

            <div className={stylesGlobal.inner}>
              <h3>Keep in touch!</h3>
              <p>Leave your name and email and get updates about our retreats and courses around the world. You can unsubscribe any time.</p>
              <div className={stylesGlobal.form_container} >

                <div className={stylesGlobal.container_horizontal}>

                  <div className={stylesGlobal.form_field}>
                    <label htmlFor="name">Your first name* </label>
                    <input type="text" name="name" id="name" required />
                  </div>

                  <div className={stylesGlobal.form_field}>
                    <label htmlFor="email">Your email* </label>
                    <input type="email" name="name" id="email" required />
                  </div>

                </div>

                <div className={stylesGlobal.form_field}>
                  <input type="checkbox" id="tcs" name="tcs" />
                  <label htmlFor="tcs">I agree with the </label>
                  <Link href="#">
                    <a className={stylesGlobal.text_link}>Privacy Policy</a>
                  </Link>
                </div>

                <div className={stylesGlobal.form_field}>
                  <input type="submit" value="Send" />
                </div>

              </div>
            </div>

          </section>
)




export default KeepInTouch