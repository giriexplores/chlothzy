export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const { password, ...userSafe } = user.toObject(); // remove password

  res
    .status(statusCode)
    .cookie('token', token, {
      expires:  new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    .json({
      success: true,
      message,
      token,
      user: userSafe,
    });
};
