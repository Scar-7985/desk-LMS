import React from 'react';
import { SITE_URL } from '../Auth/Define';

const PDFView = () => {

  const pdfUrl = (`https://wealthsaga.store/assets/test.pdf`);


  return (
    <div className='' style={{ height: 'calc(100vh - 76px)' }}>
      <iframe
        title='pdf'
        width={"100%"}
        height={"100%"}
        src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}>
      </iframe>

    </div>
  );
}

export default PDFView;


