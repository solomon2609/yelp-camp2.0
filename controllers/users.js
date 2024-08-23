const User = require('../models/user');

module.exports.renderRegisterForm = (req, res)=>{
    res.render('users/register')
}
module.exports.register = async(req, res)=>{
    try{
        const { username, email, password} = req.body;
        const user = new User({ username, email });
        const registerUser = await User.register(user, password);
        req.login(registerUser, (err)=>{
            if(err) return next(err);
            req.flash('success', 'Successfully loged in');
            res.redirect('/campgrounds');
        })
    }catch(e){ 
        req.flash('error', 'The user already exist');
        res.redirect('/register');
    }
}
module.exports.renderLoginForm = (req, res)=>{
    res.render('users/login');
}
module.exports.login = (req, res)=>{
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds'; 
    delete res.locals.returnTo;
    res.redirect(redirectUrl);
}
module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}