import React from 'react';
import { useTranslation } from 'react-i18next';


const WelcomeMessage = () => {
  const [t, i18n] = useTranslation("global");
  const currentDate = new Date();
  return (
    <div>
      <h1>{t("welcomeMessage.title")}</h1>
      <p>{t("welcomeMessage.info1")}: {currentDate.toLocaleDateString()} </p>
      <p>{t("welcomeMessage.info2")} </p>
    </div>
  );
};

export default WelcomeMessage;
