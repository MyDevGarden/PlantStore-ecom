import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({children, title='Platstore app', desc='mern stack project', keywords='mern,react,node,mongo,express', author='Mydreams'}) => {
  return (
   
    <div> 
      <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content={desc}/>
                <meta name='keywords' content={keywords}/>
                <meta name='author' content={author}/>
                <title>{title}</title>
                
      </Helmet>
        <Header/>
        <main style={{minHeight: "70vh"}}>{children}</main>
        <Toaster />
        <Footer/>
    </div>
  )
}

/*Layout.defaultProps = {
  title: 'Platstore app',
  desc: 'mern stack project',
  keywords: 'mern,react,node,mongo,express',
  author: 'Mydreams',
}*/

export default Layout