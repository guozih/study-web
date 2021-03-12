// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/:user',
          component: './$user',
        },
        {
          path: '/',
          component: './index',
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: false,
        dva: false,
        dynamicImport: false,
        title: 'umi2',
        dll: false,
        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
};
