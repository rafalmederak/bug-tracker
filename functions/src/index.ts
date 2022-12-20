import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {https} from "firebase-functions/v2";

admin.initializeApp();

export const addAdminRole = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an admin`,
      };
    })
    .catch((error) => {
      return error;
    });
});

export const createUser = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .createUser({
      email: data.email,
      phoneNumber: data?.phone || undefined,
      emailVerified: true,
      password: data.password,
      displayName: data.name,
      photoURL: data?.photo || undefined,
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been created`,
      };
    })
    .catch((error) => {
      return error;
    });
});

export const updateUser = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .updateUser(data.uid, {
      email: data.email,
      phoneNumber: data?.phone,
      emailVerified: true,
      displayName: data.name,
      photoURL: data?.photo,
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been updated`,
      };
    })
    .catch((error) => {
      return error;
    });
});

export const deleteUser = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .deleteUser(data.uid)
    .then(() => {
      return {
        message: "Success! User has been deleted",
      };
    })
    .catch((error) => {
      return error;
    });
});

export const getallusers = https.onRequest(
  {cors: true},
  (req: functions.https.Request, res: functions.Response) => {
    admin
      .auth()
      .listUsers(100)
      .then((listUsersResult) => {
        res.status(200).send(listUsersResult.users);
      })
      .catch((error) => {
        console.log("Error listing users:", error);
      });
  }
);
