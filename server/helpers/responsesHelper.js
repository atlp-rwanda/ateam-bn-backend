import tokenHelper from './TokenHelper';

const responses = (code, response, data) => {
  response.status(code).send({
    status: code,
    message: `welcome ${data.name}`,
    data: {
      token: tokenHelper.generateToken(data.id, data.username, data.email, data.role, true)
    }
  });
};

export default responses;