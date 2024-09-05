import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/BasicLayout/Layout';

const PageNotFound = () => {
    return (
        <Layout title={'go back- page not found'}>
          <div className='pnf'>
            <h1 className='pnf-status'>404</h1>
            <h2 className='pnf-heading'>Sorry, we could'nt find the page you're looking for!</h2>
            <Link to='/' className='pnf-btn'>Go Back</Link>
          </div>
        </Layout>
      );
}

export default PageNotFound