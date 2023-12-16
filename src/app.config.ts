export default defineAppConfig({
    pages: [
        'pages/login/index',
        'pages/admin/index',
        'pages/tax/index',
        'pages/wage/index',
        'pages/home/index',
        'pages/transaction/index',
        'pages/transaction/add',
        'pages/admin/company',
        'pages/admin/user',
        'pages/admin/examine',
        'pages/admin/examineList',
        'pages/table/index',
        'pages/wage/add',

    ],
    window: {
        navigationStyle:"custom",
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
    }
})
