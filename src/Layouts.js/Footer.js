import React from 'react'
import classes from './footer.module.css'

function Footer() {
 
  return (
    <footer className={classes.footer}>
    <div className={classes.footer2}> Footer Part </div>
    <div className={classes.footericons}>
      <ui className={classes.footerIconsUL}>
        
        <li className={classes.footerIconsLI}>
            <a href='https://www.facebook.com' className={classes.achor }>
            <img src='https://png.pngtree.com/png-clipart/20180515/ourmid/pngtree-facebook-logo-facebook-icon-png-image_3566127.png' className={classes.imgg}/> 
            </a> 
        </li>

        <li className={classes.footerIconsLI}>
            <a href='https://www.youtube.com/' className={classes.achor }>
            <img src='https://static.vecteezy.com/system/resources/thumbnails/018/930/572/small/youtube-logo-youtube-icon-transparent-free-png.png' className={classes.imgg}/>    
            </a>
         </li>

        <li className={classes.footerIconsLI}>
            <a href='https://www.spotify.com' className={classes.achor }>
            <img src='https://e7.pngegg.com/pngimages/158/639/png-clipart-spotify-streaming-media-logo-playlist-spotify-app-icon-logo-music-download-thumbnail.png' className={classes.imgg}/>     
            </a> 
        </li>

      </ui>
    </div>

  </footer>
  )
}

export default Footer