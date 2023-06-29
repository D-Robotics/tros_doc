// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '机器人开发平台用户手册',
  tagline: '最好用的机器人开发平台',
  favicon: 'img/logo.png',

  // Set the production url of your site here
  url: 'https://your-docusaurus-test-site.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'horizon', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/HorizonRDK/tros_doc/blob/develop/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/HorizonRDK/tros_doc/blob/develop/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      liveCodeBlock: {
        playgroundPosition: 'bottom',
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: '机器人开发平台',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'tros',
            position: 'left',
            label: '用户手册',
          },
          {
            href: 'https://developer.horizon.ai/',
            label: '开发者社区',
            position: 'left',
          },
          {
            href: 'https://github.com/HorizonRDK',
            label: 'Github',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: 'Docs',
          //   items: [
          //     {
          //       label: '手册',
          //       to: 'docs/introduction/document_usage_guide',
          //     },
          //   ],
          // },
          {
            title: '社区',
            items: [
              {
                label: '地平线开发者社区',
                href: 'https://developer.horizon.ai/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/HorizonRDK',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 地平线机器人`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['powershell'],
      },
    }),

    // themes: [
    //   // ... Your other themes.
    //   [
    //     require.resolve("@easyops-cn/docusaurus-search-local"),
    //     {
    //       // ... Your options.
    //       // `hashed` is recommended as long-term-cache of index file is possible.
    //       hashed: true,
    //       // language: ["en", "zh"],
    //       highlightSearchTermsOnTargetPage: true,
    //       explicitSearchResultPath: true,
    //       // For Docs using Chinese, The `language` is recommended to set to:
    //       // ```
    //       // language: ["en", "zh"],
    //       // ```
    //     },
    //   ],
    // ],
};

module.exports = config;