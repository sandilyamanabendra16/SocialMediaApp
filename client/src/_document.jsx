import Document from 'next/document';
import {createGetInitialProps, createRenderPage} from '@mantine/next';

const getInitialProps= createGetInitialProps(Document);
export default createRenderPage({getInitialProps});