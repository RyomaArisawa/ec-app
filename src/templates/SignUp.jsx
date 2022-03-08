import { push } from 'connected-react-router';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PrimaryButton, TextInput } from '../components/UIkit/index';
import { signUp } from '../reducks/users/operations';
const SignUp = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassowrd] = useState(''),
    [confirmPassword, setConfirmPassword] = useState('');

  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );
  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );
  const inputPassword = useCallback(
    (event) => {
      setPassowrd(event.target.value);
    },
    [setPassowrd]
  );
  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword]
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインアップ</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true}
        label={'ユーザー名'}
        multiline={false}
        required={true}
        rows={1}
        value={username}
        type={'text'}
        onChange={inputUsername}
      />
      <TextInput
        fullWidth={true}
        label={'メールアドレス'}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={'email'}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={'パスワード'}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={'password'}
        onChange={inputPassword}
      />
      <TextInput
        fullWidth={true}
        label={'パスワード（再確認）'}
        multiline={false}
        required={true}
        rows={1}
        value={confirmPassword}
        type={'password'}
        onChange={inputConfirmPassword}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={'Create New Account'}
          onClick={() =>
            dispatch(signUp(username, email, password, confirmPassword))
          }
        />
        <div className="module-spacer--medium" />
        <p onClick={() => dispatch(push('/signin'))}>
          アカウントをすでにお持ちの方はこちら
        </p>
      </div>
    </div>
  );
};

export default SignUp;
