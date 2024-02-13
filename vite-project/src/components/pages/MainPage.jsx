import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firesbase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firesbase';
import Header from '../commons/Header';
import User from '../commons/User';
import Card from '../commons/Card';
import styled from 'styled-components';

function MainPage() {
  const [data, setData] = useState([]);
  const [check, setCheck] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authInfo, setAuthInfo] = useState(null);
  const [posts, setPosts] = useState(null);
  const [localUser, setLocalUser] = useState();
  //로그인체크
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setCheck(true);
        setCurrentUser({ email: user.email, nickName: user.displayName });
        setLocalUser(user.email);
        setAuthInfo(auth);
      } else {
        setCheck(false);
        setCurrentUser(null);
      }
    });
  }, []);

  //로컬유저 정보 가져오기
  useEffect(() => {
    if (!localUser) return;
    const fetchData = async () => {
      const q = query(
        collection(db, 'users'),
        //fireStore 조건문
        where('email', '==', localUser)
      );
      const querySnapshot = await getDocs(q);

      let userData = [];

      querySnapshot.forEach((doc) => {
        userData.push({ id: doc.id, ...doc.data() });
      });
      setData(userData);
    };
    fetchData();
  }, [localUser]);

  useEffect(() => {
    const fetchData = async () => {
      let storeData = [];

      //posts
      const postsQuerySnapshot = await getDocs(collection(db, 'posts'));
      postsQuerySnapshot.forEach((doc) => {
        storeData.push({ id: doc.id, ...doc.data() });
      });
      return storeData;
    };
    fetchData().then((item) => {
      setPosts(item);
    });
  }, []);
  return (
    <>
      <Header />
      <Parents>
        <Wrapper>
          <User
            check={check}
            authInfo={authInfo}
            currentUser={currentUser}
            data={data}
          />
          {posts !== null && <Card posts={posts} />}
        </Wrapper>
      </Parents>
    </>
  );
}

export default MainPage;
export const Parents = styled.div`
  width: 100%;
  border-top: 2px solid black;
`;
export const Wrapper = styled.div`
  display: flex;
`;