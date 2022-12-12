import "../styles/globals.css";
import Head from "next/head";
import { VT323 } from '@next/font/google';

const vt323 = VT323({ subsets: ['latin'], weight: '400' })

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>CoursesDB</title>
                <link rel="icon" type="image/png" href="/favicon.png" />
            </Head>
            <style jsx global>{`
                html {
                    font-family: ${vt323.style.fontFamily};
                }
                `}</style>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;