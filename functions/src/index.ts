import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { https } from "firebase-functions/v2";
import * as firestore from "firebase-admin";

admin.initializeApp();

const db = firestore.firestore();
db.settings({ ignoreUndefinedProperties: true });

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

export const createFirestoreUser = functions.auth.user().onCreate((user) => {
  console.log(user);
  return admin
    .auth()
    .getUser(user.uid)
    .then((userRecord) => {
      console.log(userRecord);
      return admin.firestore().collection("users").doc(user.uid).set({
        email: user.email,
        phone: user.phoneNumber,
        name: user.displayName,
        photo: user.photoURL,
        admin: userRecord.customClaims?.admin,
      });
    });
});

export const deleteFirestoreUser = functions.auth.user().onDelete((user) => {
  console.log(user);
  return admin.firestore().collection("users").doc(user.uid).delete();
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
    .then((userRecord) => {
      return admin.auth().setCustomUserClaims(userRecord.uid, {
        admin: data.admin,
      });
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
  const userId: string = data.uid;

  return admin
    .auth()
    .updateUser(data.uid, {
      email: data.email,
      phoneNumber: data?.phone,
      emailVerified: true,
      displayName: data.name,
      photoURL: data?.photo,
    })
    .then((userRecord) => {
      return admin.auth().setCustomUserClaims(userRecord.uid, {
        admin: data.admin,
      });
    })
    .then(() => {
      return admin.firestore().collection("users").doc(userId).update({
        email: data.email,
        phone: data?.phone,
        name: data.name,
        photo: data?.photo,
        admin: data?.admin,
      });
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
  { cors: true },
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

export const getUser = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((userRecord) => {
      return userRecord.uid;
    })
    .catch((error) => {
      return error;
    });
});

// exports.createFirestoreUser = functions.auth.user().onCreate(user => {
//   return admin.firestore().collection("users").doc(user.uid).set({
//     email: user.email,
//     phoneNumber: user.phoneNumber || undefined,
//     displayName: user.displayName,
//     photoURL: user.photoURL || undefined,
//     admin: user.customClaims?.admin,
//     });
// })

// export const updateFirestoreUser = functions.auth.user().onUpdate((user) => {
//   console.log(user);
//   return admin
//     .auth()
//     .getUser(user.uid)
//     .then((userRecord) => {
//       console.log(userRecord);
//       return admin.firestore().collection("users").doc(user.uid).set({
//         email: user.email,
//         phone: user.phoneNumber,
//         name: user.displayName,
//         photo: user.photoURL,
//         admin: userRecord.customClaims?.admin,
//       });
//     });
// });

// export const updateFirestoreUser = functions.firestore
//   .document("users/{userId}")
//   .onUpdate((change, context) => {
//     console.log(context);
//     const userId = context.params.userId;
//     const newValue: {} = change.after.data();
//     console.log(newValue);

//     return admin.firestore().collection("users").doc(userId).update(newValue);
//   });
