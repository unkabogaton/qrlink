<template>
  <v-sheet color="#e4dce7" height="100%" class="">
    <v-img
      class="align-center"
      height="250px"
      :src="require('../assets/cover.jpeg')"
    ></v-img>

    <div class="mt-n15">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-card
            class="mx-auto pt-1 pt-sm-0 mb-5"
            max-width="700"
            tile
            :elevation="hover ? 2 : 20"
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
                v-if="created == false || !qrValue"
                >Generate QR</v-card-title
              >
              <v-card-title class="display-1 font-weight-bold" v-else
                >Generated QR</v-card-title
              >
            </v-img>
            <div class="pa-7">
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                v-if="created == false || qrValue == ''"
              >
                <v-text-field
                  required
                  v-model="qrValue"
                  :rules="longLinkRules"
                  placeholder="Long Link"
                  rounded
                  autofocus
                  filled
                  dense
                ></v-text-field>

                <div class="text-end">
                  <v-btn
                    dark
                    color="#4e2b4b"
                    rounded
                    class="mb-2"
                    @click.prevent="createQr"
                    >Generate</v-btn
                  >
                </div>
              </v-form>
              <div class="text-center" v-else>
                <div class="body-2 mb-3">
                  <span class="font-weight-medium"> QR for the link: </span>
                  {{ qrValue }}
                </div>
                <div class="ma-2">
                  <qrcode-vue
                    :value="qrValue"
                    :size="qrSize"
                    level="H"
                    className="qrcode"
                    id="picture"
                    ref="code"
                  />
                  <v-btn
                    dark
                    color="blue"
                    rounded
                    class="mt-1"
                    @click.prevent="savePic"
                    small
                    >Download</v-btn
                  >
                  <v-slider
                    hint="Drag to change size of QR"
                    max="400"
                    min="200"
                    step="100"
                    v-model="qrSize"
                    thumb-label
                    ticks
                    label="Size"
                    class="px-7 mx-7 mt-4"
                  ></v-slider>
                </div>
                <div class="mb-5 body-2">
                  Logging in will allow you to manage and edit your QR /
                  shortened links, and tracks their usage.
                </div>
                <div class="text-center">
                  <v-btn
                    dark
                    color="grey"
                    rounded
                    class="mb-2 mr-3"
                    @click.prevent="reset"
                    >Generate New</v-btn
                  >
                  <v-btn
                    dark
                    color="success"
                    rounded
                    class="mb-2"
                    @click.prevent=""
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
// import db from "../firebase/firebaseInit";
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
      qrValue: "",
      created: false,
      qrSize: "200",
    };
  },

  methods: {
    createQr() {
      if (this.$refs.form.validate()) {
        this.created = true;
      }
    },
    reset() {
      this.created = false;
      this.qrValue = "";
    },
    downloadQr() {
      this.$refs.qr.focus();
      document.execCommand("copy");
    },
    savePic() {
      //Find the canvas tag
      let myCanvas = document
        .getElementById("picture")
        .getElementsByTagName("canvas");
      //Create a tag node
      let a = document.createElement("a");
      //Set the href attribute of the a tag (turn canvas into png image)
      a.href = myCanvas[0]
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      //Set the name of the downloaded file
      a.download = "QRlink.png";
      //Click
      a.click();
      //The prompt
    },
  },
};
</script>

<style></style>
