const fs = require('fs')
const path = require('path')

function replaceAccents(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

module.exports = {
  siteMetadata: {
    title: `Ley de Urgente Consideración Comparada`,
    description: `En 2021 se intentarán anular 135 artículos de la LUC vía referéndum. Esta es una comparación de los artículos antes y después basada en datos del IMPO`,
    author: `@raulsperoni`,
    image: `images/camiloDosSantos01.png`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#b91c1c`,
        theme_color: `#b91c1c`,
        display: `minimal-ui`,
        icon: `src/images/triangulo.svg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/content/luc`,
      },
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'articulos',
        engine: 'lunr',
        query: fs.readFileSync(
            path.resolve(__dirname, 'src/localSearchQuery.graphql'),
            'utf-8',
        ),
        ref: 'numeroArticulo',
        index: ['textoModificado', 'tituloArticulo'],
        store: ['seccionArticulo', 'capituloArticulo', 'numeroArticulo','tituloArticulo'],
        normalizer: ({ data }) =>
            data.articulos.nodes.map((node) => {
              return {
                numeroArticulo: node.numeroArticulo,
                capituloArticulo: node.capituloArticulo,
                seccionArticulo: node.seccionArticulo,
                textoModificado: node.textoModificado ? node.textoModificado.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "",
                tituloArticulo: node.tituloArticulo ? node.tituloArticulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : ""
              }
            }),
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-LYRHPPN4TP", // Google Analytics / GA
        ],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: true,

        },
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/content/meta`,
      },
    },
    'gatsby-plugin-postcss',
    `gatsby-plugin-offline`
  ],
}
