import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as VIcons from "oh-vue-icons/icons/vi";
import {
  SiExpress,
  SiFastapi,
  FcAndroidOs,
  SiRabbitmq,
  SiRedis,
} from "oh-vue-icons/icons";

export default defineNuxtPlugin((nuxtApp) => {
  const Vi = Object.values({ ...VIcons });

  addIcons(...Vi, SiExpress, SiFastapi, FcAndroidOs, SiRabbitmq, SiRedis);
  nuxtApp.vueApp.component("v-icon", OhVueIcon);
});
