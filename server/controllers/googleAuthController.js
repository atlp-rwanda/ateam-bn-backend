const googleAuth = (req, res) => {
  res.status(200).json({
    status: 200,
    message: "user logged in successfully"
  });
};

export default googleAuth;