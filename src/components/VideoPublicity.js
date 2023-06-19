import React from 'react';
import '../styles/videoPublicity.css'
import { useTranslation } from 'react-i18next';

const VideoPublicity = () => {
  const videoUrl = 'https://www.youtube.com/embed/75d_29QWELk';
  const [t, i18n] = useTranslation("global");

  return (
    <div className="video-container">
      <h1>{t("welcomeMessage.messagePublicity")}</h1>
      <iframe src={videoUrl}  allowfullscreen></iframe>
      <p>{t("welcomeMessage.info3")} </p>
    </div>
  );
};

export default VideoPublicity;
