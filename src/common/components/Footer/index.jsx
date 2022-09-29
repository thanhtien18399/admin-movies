import { AndroidOutlined, AppleOutlined, FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons'
import React from 'react'
import Styles from"./style.module.css"
function FooterMovie() {
    return (
        <footer className={Styles.contact}>
            <div className={Styles.item}>
                <img src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/brand-type-film-footer_ver2.png" alt="" />
            </div>
        </footer>
    )
}

export default FooterMovie