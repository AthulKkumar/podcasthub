import React, { useEffect, useState } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepAvatar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../../../store/activateSlice";
import { activate } from "../../../http/index";
import { setAuth } from "../../../store/authSlice";
import Loader from "../../../components/shared/Loader/Loader";

const StepAvatar = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name, avatar } = useSelector((state) => state.activate); //Taking name, avatar from store
  const [image, setImage] = useState("/images/monkey-avatar.png");
  const [loading, setLoading] = useState(false);
  // const [unMounted, setUnMounted] = useState(false);

  // Capturing the inputed image(file)
  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    // Reading the image file as base64
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  }

  async function submit() {
    if (!name || !avatar) return;
    setLoading(true);
    try {
      const { data } = await activate({ name, avatar }); //server side call

      console.log(data);
      if (data.auth) {
        // if (!unMounted) {
        dispatch(setAuth(data));
        // }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   //Cleanup function
  //   return () => {
  //     setUnMounted(true);
  //   };
  // }, []);

  if (loading) return <Loader message="Activation in progress..." />;
  return (
    <>
      <Card title={`Okay ${name}!`} icon="monkey-emoji">
        <p className={styles.subHeading}>How's the photo ?</p>
        <div>
          <div className={styles.avatarWrapper}>
            <img className={styles.avatarImage} src={image} alt="avatar" />
          </div>
          <div>
            <input
              onChange={captureImage}
              id="avatarInput"
              type="file"
              className={styles.avatarInput}
            />
            <label htmlFor="avatarInput" className={styles.avatarLabel}>
              Choose another image
            </label>
          </div>
          <div className={styles.actionButtonWrapper}>
            <Button onClick={submit} text="Next" />
          </div>
        </div>
      </Card>
    </>
  );
};

export default StepAvatar;
