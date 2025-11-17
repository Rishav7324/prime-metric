<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html>
      <head>
        <title>XML Sitemap</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; color: #333; }
          #sitemap { max-width: 900px; margin: 2rem auto; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f2f2f2; font-weight: bold; }
          tr:hover { background-color: #f5f5f5; }
          a { color: #007bff; text-decoration: none; }
          a:hover { text-decoration: underline; }
          h1 { border-bottom: 2px solid #ccc; padding-bottom: 10px; }
        </style>
      </head>
      <body>
        <div id="sitemap">
          <h1>XML Sitemap</h1>
          <p>This is a XML sitemap, meant for consumption by search engines.</p>
          <p>You can find more information about XML sitemaps on <a href="http://sitemaps.org" target="_blank" rel="noopener noreferrer">sitemaps.org</a>.</p>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="urlset/url">
                <tr>
                  <td>
                    <xsl:variable name="loc" select="loc"/>
                    <a>
                      <xsl:attribute name="href">
                        <xsl:value-of select="$loc"/>
                      </xsl:attribute>
                      <xsl:value-of select="$loc"/>
                    </a>
                  </td>
                  <td>
                    <xsl:value-of select="lastmod"/>
                  </td>
                  <td>
                    <xsl:value-of select="priority"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>