import React, { Fragment, useState, useEffect } from "react";
import useStoreon from "storeon/react";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import Modal from "./Modal";
import { fetchProfile, getAuthToken, getToken } from "../api/users";

const schema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required()
});

function AuthModal(props) {
  const {
    dispatch,
    user: { authModalVisible }
  } = useStoreon("user", "ui");
  const [gettingCode, setGettingCode] = useState(false);
  const [inputValueEmail, setInputValueEmail] = useState("");
  const [inputValueCode, setInputValueCode] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const toggleInput = e => {
    const {
      target: { value }
    } = e;
    if (gettingCode) {
      if (value.length <= 4) {
        setInputValueCode(value);
      }
    } else {
      setInputValueEmail(value);
    }
  };
  useEffect(() => {
    const session = async () => {
      if (gettingCode && inputValueCode.length === 4) {
        try {
          const resultGetToken = await getToken(
            inputValueEmail,
            inputValueCode
          );
          const {
            data: { token }
          } = resultGetToken;
          Cookies.set('token', token, { expires: 365 * 30 });
          const result = await fetchProfile();
          const {
            data: {
              user: { admin }
            }
          } = result;
          dispatch("user/set_local_info", { authorized: true, admin });
          setInputValueEmail("");
          setInputValueCode("");
          setGettingCode(false);
          dispatch("ui/hideBurger");
          dispatch("user/hideAuthModal");
        } catch (e) {
          console.log(e);
          alert("Wrong code");
          dispatch("user/set_local_info", { authorized: false, admin: false });
        }
      }
    };
    session();
  }, [inputValueCode]);

  useEffect(() => {
    const validateEmail = async () => {
      const isValid = await schema.isValid({
        email: inputValueEmail
      });

      setEmailIsValid(isValid);
    };
    validateEmail();
  }, [inputValueEmail]);

  return (
    <Modal
      onClose={() => {
        dispatch("user/hideAuthModal");
        setGettingCode(false);
        setInputValueEmail("");
        setInputValueCode("");
      }}
      visible={authModalVisible}
      onCloseText="Cancel"
      onSubmitText={gettingCode ? "Submit" : "Login"}
      onSubmit={async () => {
        try {
          setSendingEmail(true);
          await getAuthToken(inputValueEmail);
          setGettingCode(true);
        } catch (e) {
          console.log(e);
          alert("Something went wrong");
        } finally {
          setSendingEmail(false);
        }
      }}
      onSubmitDisable={!emailIsValid || sendingEmail}
      onSubmitVisible={!gettingCode}
    >
      <div className="form-group">
        <h2 className="text-center text-black-50 mb-3">
          {gettingCode ? "Enter code" : "Get login code"}
        </h2>
        <Fragment>
          <input
            value={gettingCode ? inputValueCode : inputValueEmail}
            onChange={toggleInput}
            type="email"
            className="form-control text-center"
            placeholder={gettingCode ? "code" : "email"}
          />
          <small className="form-text text-muted text-center mt-3">
            {gettingCode
              ? "Check your mailbox."
              : "We'll never share your email with anyone else."}
          </small>
          <div className="d-flex justify-content-center align-items-center">
            {sendingEmail && (
              <FontAwesomeIcon
                className="mt-2 text-white text-black-50"
                size="1x"
                icon={faSpinner}
                pulse
              />
            )}
          </div>
        </Fragment>
      </div>
    </Modal>
  );
}

export default AuthModal;
