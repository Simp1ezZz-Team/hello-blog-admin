import "vue-router";

declare module "vue-router" {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    // 默认 false，设置 true 的时候该路由不会在侧边栏出现
    hidden?: boolean;

    // 设置该路由在侧边栏和面包屑中展示的名字
    title?: string;

    // 设置该路由的图标
    icon?: string;

    // 路由是否在tab栏固定
    affix?: boolean;
  }
}
