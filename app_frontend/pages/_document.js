import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>

        {/* เพิ่มการเชื่อมต่อกับ Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

        {/* ฟอนต์ Instrument Sans */}
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* ฟอนต์ Instrument Sans */}
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        {/* ฟอนต์ Prompt */}
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />

        <link href="https://fonts.googleapis.com/css2?family=Mitr:wght@200;300;400;500;600;700&family=Noto+Sans+Thai:wght@100..900&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-XoM9Jj9O+RC5jWwDJf+f+Hg1+2uT5OEfQ6C2vqLmQw7F4XeF8VTVynOmPMdjKkvS3F3M1TTkRBqJId6L+ewQ6g=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
