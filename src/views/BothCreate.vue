<template>
  <v-sheet color="#e4dce7" height="100%" class="">
    <v-img
      class="align-center"
      height="300px"
      :src="require('../assets/cover.jpeg')"
    ></v-img>

    <div class="mx-2 mt-n15">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-card
            class="mx-auto pa-7"
            width="500"
            shaped
            :elevation="hover ? 2 : 20"
          >
            <h3 class="display-1 pa-3 mb-2">Shorten Link</h3>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                required
                v-model="longLink"
                :rules="longLinkRules"
                placeholder="Long Link"
                rounded
                autofocus
                filled
                dense
              ></v-text-field>
              <v-text-field
                :disabled="longLink == ''"
                required
                v-model="linkName"
                :rules="linkRules"
                placeholder="ShortLink"
                rounded
                filled
                dense
              >
                <template v-slot:prepend-inner>
                  <span class="mt-1 font-weight-medium"> ju-tay.web.app/ </span>
                </template>
              </v-text-field>
              <div class="text-end">
                <v-btn
                  dark
                  color="#4e2b4b"
                  rounded
                  class="mb-2"
                  @click.prevent="createLink"
                  >Shorten</v-btn
                >
              </div>
            </v-form>
          </v-card>
        </template>
      </v-hover>
    </div>
    <qrcode-vue :value="qrValue" size="200" level="H" />
    <v-text-field
      required
      v-model="qrValue"
      :rules="longLinkRules"
      placeholder="Long Link"
      rounded
      filled
      dense
    ></v-text-field>
  </v-sheet>
</template>

<script>
import db from "../firebase/firebaseInit";
import QrcodeVue from "qrcode.vue";

export default {
  name: "LinkCreate",
  components: {
    QrcodeVue,
  },
  data() {
    return {
      valid: true,
      longLink: "",
      LongLinkRules: [(v) => !!v || "Long link is required"],
      linkName: "",
      linkRules: [
        (v) => !!v || "Custom link is required",
        (v) =>
          (v && v.length >= 5) ||
          "Custom link must be greater than 5 characters",
        (v) =>
          (v && v.length <= 12) ||
          "Custom link must be less than 12 characters",
      ],
      qrValue: "",
    };
  },

  methods: {
    async createLink() {
      if (this.$refs.form.validate()) {
        let store = await db.collection("links");
        await store
          .doc(this.linkName)
          .get()
          .then((doc) => {
            if (doc.exists) {
              alert(
                "The shortened link is already taken! Please provide another link."
              );
            } else {
              store.doc(this.linkName).set({
                longLink: this.longLink,
                shortLink: this.linkName,
                createdAt: Date.now(),
              });
              alert("Link Added: ju-tay.web.app/" + this.linkName);
              this.longLink = "";
              this.linkName = "";
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }
    },
  },
};
</script>

<style></style>
