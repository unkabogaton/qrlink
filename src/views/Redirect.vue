<template>
  <div>
    <v-snackbar v-model="notify"> Link does not exist </v-snackbar>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";

export default {
  name: "Redirect",
  data() {
    return {
      notify: false,
    };
  },

  async created() {
    await db
      .collection("links")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          window.location.href = doc.data().longLink;
        } else {
          this.notify = true;
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
