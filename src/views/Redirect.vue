<template>
  <v-container> <h1>Redirecting you to...</h1> </v-container>
</template>

<script>
import db from "../firebase/firebaseInit";

export default {
  name: "Redirect",

  async created() {
    await db
      .collection("links")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          window.location.href = doc.data().longLink;
        } else {
          console.log("No such document!");
          alert("Link does not exist!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    // db.collection("links")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       // doc.data() is never undefined for query doc snapshots
    //       console.log(doc.data());
    //     });
    //   });
  },
};
</script>
