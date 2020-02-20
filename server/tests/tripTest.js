import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mochaAsync from '../helpers/mochaAsync';
import {
  oneWayTrip,
  incopreteWayTrip,
  incoDateWayTrip,
  incoloacationWayTrip,
  incoAccommodationWayTrip,
  twoWayTrip,
  twoWayTripMultipleCity,
  rememberTrip
} from './mochData/trips';
import usersTester from './mochData/users';

chai.use(chaiHttp);
chai.should();

const router = () => chai.request(app);

let tokenTrue;
let tokenFalse;
let mytoken;

describe('Test for create one way trip endpoint', () => {
  it(
    "should signin before making any request, to test it",
    mochaAsync(async () => {
      const res = await router()
        .post('/api/auth/signin')
        .send(usersTester[6]);
      mytoken = res.body.data.token;
    })
  );
  it(
    'should create a new one way trip',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trip')
        .set('token', mytoken)
        .send(oneWayTrip);
      expect(res.body.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.equal('Trip was created successfully.');
      expect(res.body.data).to.be.an('object');
    })
  );
  it(
    'should not create a new one way trip',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trip')
        .set('token', mytoken)
        .send(oneWayTrip);
      expect(res.body.status).to.equal(409);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should not create a new trip when data are incomplete',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trip')
        .set('token', mytoken)
        .send(incopreteWayTrip);
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should not create a new trip if date is invalide',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trip')
        .set('token', mytoken)
        .send(incoDateWayTrip);
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should not create a new trip if location is invalide',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trip')
        .set('token', mytoken)
        .send(incoloacationWayTrip);
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should not create a new trip if accommodation is not from trip loacation',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trip')
        .set('token', mytoken)
        .send(incoAccommodationWayTrip);
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should create a new one way trip',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trip')
        .set('token', mytoken)
        .send(twoWayTrip);
      expect(res.body.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
    })
  );
  it(
    'should create a new one way trip',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trip')
        .set('token', mytoken)
        .send(twoWayTripMultipleCity);
      expect(res.body.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
    })
  );
});

describe('Test for Trip Stats endpoint', () => {
  it(
    'should get all trip stats',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trip/stats')
        .set('token', mytoken);
      expect(res.body.status).to.equal(200);
      expect(res.body).to.be.an('object');
    })
  );
  it(
    'should get error on trip stats when wrong fields are provided',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trip/stats')
        .set('token', mytoken)
        .send({ myend: '2020-01-20', mystart: '2020-01-20' });
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should get error on trip stats when wrong date range',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trip/stats')
        .set('token', mytoken)
        .send({ endDate: '2020-01-20', startDate: '2020-01-25' });
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should get trip stats with 4 element in the data',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trip/stats')
        .set('token', mytoken)
        .send({ endDate: '2020-01-20', startDate: '2020-01-01' });
      expect(res.body.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.data).to.contain.keys('lastDays', 'lastWeeks', 'lastWMonths', 'dateRange');
    })
  );
});

describe('remembered profile tests', () => {
  it('Travel administrator login request', async () => {
    const res = await chai
      .request(app)
      .post('/api/auth/signin')
      .send({ email: 'dummy2@email.rw', password: '123456789' });
    tokenTrue = res.body.data.token;
    res.should.have.status(200);
    res.body.should.be.an('object');
  });
  it('Travel administrator login request', async () => {
    const res = await chai
      .request(app)
      .post('/api/auth/signin')
      .send({ email: 'nigorjeanluc@gmail.com', password: 'secret123' });
    tokenFalse = res.body.data.token;
    res.should.have.status(200);
    res.body.should.be.an('object');
  });
  it(' profile of user should be remembered on the next request initiation ', async () => {
    const res = await chai
      .request(app)
      .post('/api/trip')
      .set('token', tokenTrue)
      .send(rememberTrip);
    console.log(res.body);
    res.should.have.status(201);
    res.body.should.be.an('object');
  });
  it('user should be able to create a trip when rememberMe is false', async () => {
    const res = await chai
      .request(app)
      .post('/api/trip')
      .set('token', tokenFalse)
      .send(rememberTrip);
    res.should.have.status(201);
    res.body.should.be.an('object');
  });
});
