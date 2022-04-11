import { initialize } from '@iterable/web-sdk';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './styles/index.css';

import Home from 'src/views/Home';
import Commerce from 'src/views/Commerce';
import Events from 'src/views/Events';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Link from 'src/components/Link';
import styled from 'styled-components';
import LoginForm from 'src/components/LoginForm';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
`;

const RouteWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: flex-end;
  margin: 1em;
`;

const HomeLink = styled(Link)`
  width: 100px;
  margin-left: 0.8em;
`;

((): void => {
  const { setEmail } = initialize(process.env.API_KEY || '', ({ email }) => {
    return axios
      .post(
        'http://localhost:5000/generate',
        {
          exp_minutes: 2,
          email,
          jwt_secret: process.env.JWT_SECRET
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then((response) => {
        return response.data?.token;
      });
  });

  ReactDOM.render(
    <BrowserRouter>
      <Wrapper>
        <HeaderWrapper>
          <LoginForm setEmail={setEmail} />
          <HomeLink renderAsButton to="/">
            Home
          </HomeLink>
        </HeaderWrapper>
        <RouteWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/commerce" element={<Commerce />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </RouteWrapper>
      </Wrapper>
    </BrowserRouter>,
    document.getElementById('root')
  );
})();
