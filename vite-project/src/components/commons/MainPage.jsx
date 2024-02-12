import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firesbase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firesbase';
import Header from './Header';
import User from './User';
import Card from './Card';
import styled from 'styled-components';

function MainPage() {
  const [data, setData] = useState([]);
  const [check, setCheck] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authInfo, setAuthInfo] = useState(null);
  const [posts, setPosts] = useState(null);

  //로그인체크
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setCheck(true);
        setCurrentUser({ email: user.email, nickName: user.displayName });
        setAuthInfo(auth);
      } else {
        setCheck(false);
        setCurrentUser(null);
      }
    });
  }, [data]);

  // //db데이터 가져오기
  // useEffect(() => {
  //   if (!currentUserEmail) return;
  //   const fetchData = async () => {
  //     const q = query(
  //       collection(db, 'users'),
  //       //fireStore 조건문
  //       where('email', '==', currentUserEmail)
  //     );
  //     const querySnapshot = await getDocs(q);

  //     let userData = [];

  //     querySnapshot.forEach((doc) => {
  //       userData.push({ id: doc.id, ...doc.data() });
  //     });
  //     setData(userData);
  //   };
  //   fetchData();
  // }, [currentUserEmail]);

  //

  // const fetchPostshData = async () => {
  //   const q = query(collection(db, 'posts'));
  //   const querySnapshot = await getDocs(q);
  //   const initialData = [];

  //   querySnapshot.forEach((doc) => {
  //     initialData.push({ id: doc.id, ...doc.data() });

  //     setPosts(initialData);
  //   });
  // };
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
    <div>
      <Header />
      <Parents>
        <Wrapper>
          <UserSection>
            <User check={check} authInfo={authInfo} currentUser={currentUser} />
          </UserSection>
          <CardSection>{posts !== null && <Card posts={posts} />}</CardSection>
        </Wrapper>
      </Parents>
    </div>
  );
}

export default MainPage;
export const Parents = styled.div`
  width: 100%;
  heigth:100%
  display: flex;
  border: 2px solid black;
  background-color: lightgrey;
`;
export const Wrapper = styled.div`
  display: flex;
`;
export const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
