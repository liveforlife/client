###Welcome to use MarkDown
 {menuList: [
          {num: '1', index: '/Home', title: '个人中心', icon: 'icon-userinfo'},
          {
            num: '2',
            title: '账户管理',
            icon: 'icon-user-manege',
            subs: [
              {index: '/accountAdd', title: '新建账户', icon: 'icon-add-user1'},
              {index: '/accountSearch', title: '账户查询', icon: 'icon-user-search'}
              {index: '/contactsManager', title: '通录管理', icon: 'icon-user-search'}
            ]
          },
          {
            num: '3',
            title: '订单管理',
            icon: 'icon-order',
            subs: [
              {index: '/sale', title: '销售下单', icon: 'icon-order'},
              {
                title: ' 仓储下单',
                icon: 'icon-order',
                subs: [
                  {index: '/localstorage', title: '本地仓到华药仓', icon: 'icon-order'},
                  {index: '/getinto', title: '直接入库华药仓', icon: 'icon-order'}
                ]
              },
              {index: '/temporaryorder', title: '临时订单', icon: 'icon-order'},
              {index: '/queryorder', title: '订单查询', icon: 'icon-order'}
            ]
          },
          {
            num: '4',
            title: '仓储管理',
            icon: 'icon-line-set',
            subs: [
              {index: '/depotList', title: '仓库管理', icon: 'icon-shop'},
			  {index: '/inputDrugs', title: '药品录入', icon: 'icon-add-10'},
			  {index: '/stockList', title: '库存查询', icon: 'icon-add-10'},			  
              {index: '/depotIn', title: '入库记录', icon: 'icon-add-10'},              
              {index: '/depotOut', title: '出库记录', icon: 'icon-add-10'}              
            ]
          },
          {
            num: '5',
            title: '财务管理',
            icon: 'icon-finance-comfire',
            subs: [
             {index: '/comQuery', title: '综合查询', icon: 'icon-pay'},
             {index: '/management', title: '结算清单', icon: 'icon-pay'},
              /*{ title: ' 签收单',
                icon: 'icon-order',
                subs: [
                  {index: '/localstorage', title: '本地仓到华药仓', icon: 'icon-order'}
                  // {index: '/getinto', title: '直接入库华药仓', icon: 'icon-order'}
                ]
              },
              {index: '', title: '支付管理', icon: 'icon-pay'},*/
              {index: '/invoice', title: '发票管理', icon: 'icon-invoice-search'}
            ]
          },
       /*{
        num: '6',
         title: '退换货管理',
        icon: 'icon-line-set',
        subs: [
        {index: '/returnManagement', title: '退换货订单查询', icon: 'icon-shop'},
       ]
       },*/
         { num: '6', title: '赔偿单管理', index: '', icon: 'icon-drive',
          subs:[
           {   index: 'ClaimQuery', title: '赔偿单查询', icon: 'icon-pay',},
          ]
         },
        ]}
