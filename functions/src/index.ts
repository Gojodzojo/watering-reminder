import {pubsub} from "firebase-functions";
import * as admin from "firebase-admin";
import {MessagingPayload} from "firebase-admin/lib/messaging/messaging-api";

const app = admin.initializeApp();
const firestore = app.firestore();
const messaging = app.messaging();

export const sendPush = pubsub.schedule("every 1 minutes").onRun(async () => {
  const users = await firestore.collection("users").listDocuments();
  users.forEach(async (user) => {
    const plants = await user.collection("plants").get();
    plants.forEach(async (plant) => {
      const plantData = plant.data();

      const timeFormatOptions: Intl.DateTimeFormatOptions = {
        timeZone: plantData.timezone,
        timeStyle: "short",
      };
      // eslint-disable-next-line
      const timeInPlantTimezone = new Intl.DateTimeFormat("PL", timeFormatOptions).format();

      if (timeInPlantTimezone === plantData.waterTime) {
        const payload: MessagingPayload = {
          notification: {
            title: "Watering time",
            body: `It's time to water ${plantData.name}`,
            image: plantData.imageUrl ? plantData.imageUrl : "https://watering-reminder.web.app/assets/images/default_plant_image.png",
          },
        };

        const fcmTokens = await user.collection("fcmTokens").get();
        fcmTokens.forEach(async (token) => {
          const tokenData = token.data() as { fcmToken: string };
          await messaging.sendToDevice(tokenData.fcmToken, payload);
        });
      }
    });
  });
});
