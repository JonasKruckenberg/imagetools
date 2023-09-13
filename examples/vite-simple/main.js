import './style.css'
// import 3 different sizes of the image and create a srcset from them
import srcsetAvif from '../example.jpg?w=500;700;900;1200&format=avif&as=srcset'
// do it a second time, but now as webp since safari can't display avif
import srcsetWebp from '../example.jpg?w=500;700;900;1200&format=webp&as=srcset'
// create a small placeholder and import its metadata
import { src as placeholder, width, height } from '../example.jpg?w=300&as=metadata'

const sponsors = import.meta.glob('./sponsors/*', {
  query: { format: 'webp', w: 100 }
})

let sponsorHtml = ''
for (let sponsor of Object.values(sponsors)) {
  const import_statment = sponsor()
  const url = (await import_statment).default
  sponsorHtml += `<img src="${url}" /><br/>`
}

document.querySelector('#app').innerHTML = `
  <h1>Hello Imagetools!</h1>
  <a href="https://github.com/JonasKruckenberg/imagetools/tree/main/docs" target="_blank">Documentation</a>
  
  <!-- Now we can use our images -->
  <picture>
    <source srcset="${srcsetAvif}" type="image/avif"/>
    <source srcset="${srcsetWebp}" type="image/webp"/>
    <img 
        src="${placeholder}"
        width="${width}" 
        height="${height}"
        alt="Women Lying Near to a Multicolored Glass Window Close-up Photography"/>
  </picture>

  <div style="width:300px; margin: 50px auto">
    Here are a few sponsors of Vite:<br/>
    <br/>
    ${sponsorHtml}
  </div>
`
