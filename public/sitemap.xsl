<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
  <html>
    <head>
      <title>XML Sitemap</title>
      <style type="text/css">
        body { font-family: sans-serif; color: #333; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; cursor: pointer; }
        a { color: #007bff; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <h1>XML Sitemap</h1>
      <p>This is an XML sitemap, used by search engines to index the website.</p>
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Last Modified</th>
          </tr>
        </thead>
        <tbody>
          <xsl:for-each select="sitemap:urlset/sitemap:url">
            <tr>
              <td>
                <xsl:variable name="itemURL">
                  <xsl:value-of select="sitemap:loc"/>
                </xsl:variable>
                <a href="{$itemURL}">
                  <xsl:value-of select="sitemap:loc"/>
                </a>
              </td>
              <td>
                <xsl:value-of select="sitemap:lastmod"/>
              </td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </body>
  </html>
</xsl:template>
</xsl:stylesheet>
