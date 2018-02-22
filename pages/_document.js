import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import skeleton from '../src/components/skeleton/skeleton.min.css'

export default class MyDocument extends Document {
  static getInitialProps({renderPage}) {
    const {html, head, errorHtml, chunks} = renderPage()
    const styles = flush()
    return {html, head, errorHtml, chunks, styles}
  }

  render() {
    return (
      <html>
        <Head>
          <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
          <script src="https://use.fontawesome.com/d599b86078.js"></script>
          <style dangerouslySetInnerHTML={{__html: skeleton}}/>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </html>
    )
  }
}
