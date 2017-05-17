/**
 * Created by Administrator on 2017/4/24.
 * 接口工具库
 */
/**引入分页查询工具库*/
const dbHelper = require('./page-query');
/**引入token工具*/
const jwt = require('jsonwebtoken');
/**引入数据模型*/
const user_module = require('../models/user');
const article_module = require('../models/article');
/**引入express包*/
const express = require('express');
/**创建路由*/
const router = express.Router();
/**验证token的中间键*/
const check_api_token = require('./check_api_token');
/**发送邮件的插件*/
const sendMail = require('../lib/mail');

/**创建接口*/
/**用户登录*/
router.post('/blog_backstage/login',(req,res) => {
    /**这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')*/
    if(!req.query.user_name) {
        res.json({status: 0, msg: '请输入帐号'});
        return;
    }
    if(!req.query.user_password) {
        res.json({status: 0, msg: '请输入密码'});
        return;
    }
    let user = {
        user_name: req.query.user_name,
        user_password: req.query.user_password
    };
    user_module.find(user, function(err, doc){
        if(doc.length){
            /**创建token*/
            let token = jwt.sign(user, 'app.get(superSecret)', {
                expiresIn: 60*60*24 /**设置过期时间*/
            });
            res.json({
                status: 1,
                msg: '登陆成功',
                data: {
                    token,
                    user: {
                        _id: doc[0]._id,
                        user_name: doc[0].user_name
                    }
                }
            });
        }else{
            res.json({
                status: 0,
                msg: '帐号或密码不正确'
            });
        }
    });
});

/**存储文章*/
router.get('/blog_backstage/uploadArticle',( req, res ) => {
    var article = req.query.article && JSON.parse( req.query.article );
    if (!article) {
        res.json({
            status: 0,
            msg: '文案都没写，竟敢调戏窝！'
        })
        return;
    }
    article.article_time = new Date();
    
})


module.exports = router;