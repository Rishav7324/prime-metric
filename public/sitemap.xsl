<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap | Prime Metric</title>
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            font-size: 16px;
            color: #333;
            background-color: #007E6E
            margin: 0;
            padding: 20px;
          }
          #main {
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
            background-color: #D2DCB6;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            overflow: hidden;
          }
          h1 {
            font-size: 28px;
            font-weight: 600;
            color: #2c3e50;
            margin: 0;
            padding: 24px;
            border-bottom: 1px solid #e9ecef;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            text-align: left;
            padding: 12px 24px;
            border-bottom: 1px solid #e9ecef;
          }
          th {
            font-weight: 600;
            color: #495057;
            background-color: #f1f3f5;
          }
          tr:hover {
            background-color: #f1f3f5;
          }
          a {
            color: #007bff;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          td a {
            word-break: break-all;
          }
          .count {
            padding: 24px;
            font-size: 18px;
            color: #495057;
          }
        </style>
      </head>
      <body>
        <div id="main">
          <h1>Sitemap</h1>
          <div class="count">
            Total URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
          </div>
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
                    <a>
                      <xsl:attribute name="href">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:attribute>
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
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
