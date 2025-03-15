declare module "vue-awesome/components/Icon" {
  import Vue from "vue";
  const FaIcon: Vue.Component;
  export default FaIcon;
}

declare module "vue-awesome/icons/*" {
  const content: string;
  export default content;
}
