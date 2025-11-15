// create token and saving that in the cookies

const sendShopToken = (user,res) => {
    const token = user.getJwtToken();

    // option for cookies
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true 
    };

    res.cookie("seller_token", token, options).json({
        success: true,
        user,
        token 
    })
}

module.exports = sendShopToken;