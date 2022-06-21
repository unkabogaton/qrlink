<template>
  <v-sheet height="100%" class="" color="#e4dce7">
    <v-app-bar
      v-if="route != 'Home'"
      color="rgba(255,255,255,0.7)"
      fixed
      elevation="10"
      class="ma-5 px-sm-15"
      dense
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <a href="/" style="text-decoration: none">
        <div
          class="font-weight-bold text-h6 text-sm-h5 text"
          style="text-color: #321730"
        >
          QR-Link
        </div>
      </a>
      <v-spacer></v-spacer>
      <v-btn
        rounded
        :small="$vuetify.breakpoint.smAndDown"
        class="btn-grad mr-2"
        dark
        @click="
          $router.push({ name: 'Qr' });
          reroute();
        "
      >
        <span v-if="$vuetify.breakpoint.mdAndUp" class="font-weight-light"
          >Generate</span
        >
        QR
      </v-btn>
      <v-btn
        rounded
        :small="$vuetify.breakpoint.smAndDown"
        class="btn-grad mr-2"
        dark
        @click="
          $router.push({ name: 'ShortLink' });
          reroute();
        "
      >
        <span v-if="$vuetify.breakpoint.mdAndUp" class="font-weight-light"
          >Shorten</span
        >
        URL
      </v-btn>
      <v-btn
        rounded
        :small="$vuetify.breakpoint.smAndDown"
        class="btn-grad"
        dark
        @click="
          $router.push({ name: 'Both' });
          reroute();
        "
      >
        <span v-if="$vuetify.breakpoint.mdAndUp" class="font-weight-light"
          >Create</span
        >
        QR+URL
      </v-btn>
    </v-app-bar>
    <v-img
      class="align-center pb-n16 text-center white--text"
      max-height="300px"
      :src="require('../assets/cover.jpeg')"
      :lazy-src="require('../assets/cover.jpeg')"
      ><div v-if="route == 'Home'">
        <div
          class="text-h3 text-sm-h1 font-weight-bold"
          style="text-shadow: 2px 2px 20px #000000"
        >
          QR-Link
        </div>
        <div class="text-body-2 text-sm-body-1">
          A URL shortener and a QR generator
        </div>
      </div></v-img
    >
    <v-snackbar v-model="notify">
      {{ message }}
    </v-snackbar>
    <div class="mt-n15 mb-7">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-card
            class="mx-auto"
            max-width="700"
            :elevation="hover ? 2 : 20"
            tile
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
                class="text-h5 text-md-h4 font-weight-light"
                v-if="route == 'Home'"
                >What <span class="font-weight-bold"> ToDo</span>?</v-card-title
              >
              <v-card-title v-else class="text-h5 text-md-h4 font-weight-bold"
                ><span class="font-weight-light"
                  ><span v-if="shortened == false || route == 'Home'"
                    >Generate</span
                  ><span v-else>Generated</span></span
                >
                <span v-if="route == 'ShortLink' || route == 'Both'"
                  >ShortURL</span
                >
                <span class="font-weight-light" v-if="route == 'Both'">+</span>
                <span v-if="route == 'Qr' || route == 'Both'"
                  >QR</span
                ></v-card-title
              >
            </v-img>
            <div class="pa-7">
              <div v-if="route == 'Home'">
                <v-btn
                  rounded
                  class="my-4 btn-grad mx-auto"
                  dark
                  @click="
                    $router.push({ name: 'Qr' });
                    reroute();
                  "
                >
                  <span class="font-weight-light">Generate</span>
                  QR
                </v-btn>
                <v-btn
                  rounded
                  class="my-4 btn-grad mx-auto"
                  dark
                  @click="
                    $router.push({ name: 'ShortLink' });
                    reroute();
                  "
                >
                  <span class="font-weight-light">Shorten</span>
                  URL
                </v-btn>
                <v-btn
                  rounded
                  class="my-4 btn-grad mx-auto"
                  dark
                  @click="
                    $router.push({ name: 'Both' });
                    reroute();
                  "
                >
                  <span class="font-weight-light">Create</span>
                  QR+URL
                </v-btn>
              </div>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                v-else-if="shortened == false"
              >
                <v-text-field
                  required
                  v-model="longLink"
                  :rules="longLinkRules"
                  placeholder="URL here"
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
                  v-if="route == 'ShortLink' || route == 'Both'"
                >
                  <template v-slot:prepend-inner>
                    <span class="mt-1 font-weight-medium">
                      {{ baseUrl }}/
                    </span>
                  </template>
                </v-text-field>
                <!-- <div class="mb-6 body-2">
                  Logging in will allow you to manage and edit your QR /
                  shortened links, and tracks their usage.
                </div> -->
                <div class="text-end">
                  <v-btn
                    dark
                    color="#4e2b4b"
                    rounded
                    class="mb-2"
                    @click.prevent="createLink"
                    v-if="route == 'ShortLink' || route == 'Both'"
                    >Generate</v-btn
                  >
                  <v-btn
                    dark
                    color="#4e2b4b"
                    rounded
                    class="mb-2"
                    @click.prevent="createQr"
                    v-else
                    >Generate</v-btn
                  >
                </div>
              </v-form>
              <div v-else>
                <div class="my-3 text-center">
                  <div class="text-start mb-4">
                    <v-icon large @click="back">mdi-keyboard-backspace</v-icon>
                    <span @click="back" class="font-weight-medium"> Back</span>
                  </div>
                  <v-text-field
                    :value="finalLink"
                    id="testing-code"
                    rounded
                    outlined
                    dense
                    readonly
                    ref="clone"
                    @click="copy"
                    @click:append="copy"
                    append-icon="mdi-content-copy"
                    hint=""
                    class="mx-auto"
                    v-if="route == 'ShortLink' || route == 'Both'"
                  >
                  </v-text-field>
                  <div v-if="route == 'Qr' || route == 'Both'">
                    <div class="body-2 mb-3">
                      <span class="font-weight-medium"> QR for the link: </span>
                      {{ longLink }}
                    </div>
                    <div class="ma-2">
                      <qrcode-vue
                        :value="longLink"
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
                  </div>
                  <!-- <div class="mt-n4 mb-6 body-2">
                    Logging in will allow you to manage and edit your QR /
                    shortened links, and tracks their usage.
                  </div> -->
                </div>
                <div class="text-center">
                  <v-btn
                    dark
                    color="grey"
                    rounded
                    class="mb-2"
                    @click.prevent="reset"
                    >Generate New</v-btn
                  >
                  <!-- <v-btn
                    dark
                    color="success"
                    rounded
                    class="mb-2"
                    @click.prevent="reset"
                    >Login/Register</v-btn
                  > -->
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
import QrcodeVue from "qrcode.vue";

export default {
  name: "BothCreate",
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
      notify: false,
      message: "",
      shortened: false,
      finalLink: null,
      baseUrl: window.location.origin.split("//")[1],
      qrSize: "200",
      route: this.$route.name,
    };
  },
  mounted() {
    window.onscroll = () => {
      this.changeColor();
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
                  if (this.route == "Both") {
                    this.message =
                      "The shortened URL and QR is successfuly created!";
                  } else {
                    this.message = "The shortened URL is successfuly created!";
                  }
                  this.notify = true;
                  this.shortened = true;
                  this.finalLink = this.baseUrl + "/" + this.linkName;
                });
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }
    },
    changeColor() {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        this.bg = "white";
      } else {
        this.bg = "transparent";
      }
    },
    copy() {
      let testingCodeToCopy = document.querySelector("#testing-code");
      testingCodeToCopy.setAttribute("type", "text");
      testingCodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        console.log("Shortened URL was copied " + msg);
      } catch (err) {
        console.log("Oops, unable to copy");
      }
    },
    reset() {
      this.shortened = false;
      this.finalLink = null;
      this.longLink = "";
      this.linkName = "";
    },
    savePic() {
      let myCanvas = document
        .getElementById("picture")
        .getElementsByTagName("canvas");
      let a = document.createElement("a");
      a.href = myCanvas[0]
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      a.download = "QRLink.png";
      a.click();
    },
    back() {
      this.shortened = false;
    },
    createQr() {
      if (this.$refs.form.validate()) {
        this.shortened = true;
        this.message = "The QR is successfuly created!";
        this.notify = true;
        return;
      }
      this.message = "Please fill in the text box.";
      this.notify = true;
    },
    reroute() {
      this.route = this.$route.name;
    },
  },
};
</script>

<style scoped>
.btn-grad {
  background-image: linear-gradient(
    to right,
    #321730 0%,
    #b464b4 51%,
    #314755 100%
  );
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  display: block;
}

.btn-grad:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}
.text {
  background-image: linear-gradient(100deg, #321730, #8a5689);
  background-clip: text;
  color: transparent;
  border-bottom: 5px solid #8a5689;
}
</style>
