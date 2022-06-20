<template>
  <v-sheet height="100%" class="">
    <v-img
      class="align-center pb-n16"
      max-height="300px"
      :src="require('../assets/cover.jpeg')"
    ></v-img>
    <v-snackbar v-model="notify">
      {{ message }}
    </v-snackbar>
    <div class="mt-n15">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-card
            class="mx-auto pt-1 pt-sm-0"
            max-width="700"
            :elevation="hover ? 2 : 20"
            tile
            ripple
          >
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              color="#321730"
              class="white--text align-end"
              gradient="to top right, #321730, rgba(25,32,72,.7)"
              height="90px"
              tile
            >
              <v-card-title
                class="display-1 font-weight-bold"
                v-if="shortened == false || !finalLink"
                >Shorten Link</v-card-title
              >
              <v-card-title class="display-1 font-weight-bold" v-else
                >Shortened Link</v-card-title
              >
            </v-img>
            <div class="pa-7">
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                v-if="shortened == false || !finalLink"
              >
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
                  rounded
                  filled
                  dense
                >
                  <template v-slot:prepend-inner>
                    <span class="mt-1 font-weight-medium">
                      {{ baseUrl }}/
                    </span>
                  </template>
                </v-text-field>
                <div class="mb-6 body-2">
                  Logging in will allow you to manage and edit your QR /
                  shortened links, and tracks their usage.
                </div>
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
              <div v-else>
                <div class="my-3">
                  <v-text-field
                    v-model="finalLink"
                    rounded
                    outlined
                    dense
                    readonly
                    v-on:focus="$event.target.select()"
                    ref="clone"
                    @click="copy"
                    @click:append="copy"
                    append-icon="mdi-content-copy"
                    hint=""
                  >
                  </v-text-field>
                  <div class="mt-n4 mb-6 body-2">
                    Logging in will allow you to manage and edit your QR /
                    shortened links, and tracks their usage.
                  </div>
                </div>
                <div class="text-end">
                  <v-btn
                    dark
                    color="grey"
                    rounded
                    class="mb-2 mr-3"
                    @click.prevent="reset"
                    >Create New</v-btn
                  >
                  <v-btn
                    dark
                    color="success"
                    rounded
                    class="mb-2"
                    @click.prevent="reset"
                    >Login/Register</v-btn
                  >
                </div>
              </div>
            </div>
          </v-card>
        </template>
      </v-hover>
    </div>
  </v-sheet>
</template>

<script>
import db from "../firebase/firebaseInit";

export default {
  name: "LinkCreate",
  data() {
    return {
      valid: true,
      longLink: "",
      longLinkRules: [(v) => !!v || "Long link is required"],
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
      notify: false,
      message: "",
      shortened: false,
      finalLink: null,
      baseUrl: window.location.origin,
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
              this.message =
                "The shortened link is already taken! Please provide another link.";
              this.notify = true;
            } else {
              store
                .doc(this.linkName)
                .set({
                  longLink: this.longLink,
                  shortLink: this.linkName,
                  createdAt: Date.now(),
                })
                .then(() => {
                  this.message = "The shortened link is successfuly created!";
                  this.notify = true;
                  this.shortened = true;
                  this.finalLink = this.baseUrl + "/" + this.linkName;
                })
                .then(() => {
                  this.longLink = "";
                  this.linkName = "";
                });
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }
    },
    copy() {
      this.$refs.clone.focus();
      document.execCommand("copy");
      this.message = "The link is copied to clipboard!";
      this.notify = true;
    },
    reset() {
      this.shortened = false;
      this.finalLink = null;
    },
  },
};
</script>

<style></style>
