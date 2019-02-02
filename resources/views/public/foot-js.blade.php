<!-- jQuery (Bootstrap 的所有 JavaScript 插件都依赖 jQuery，所以必须放在前边) -->
<script src="{{ config('development.cdn_assets.foot_js.jquery') }}"></script>
<!-- 加载 Bootstrap 的所有 JavaScript 插件。你也可以根据需要只加载单个插件。 -->
<script src="{{ config('development.cdn_assets.foot_js.bootstrap') }}"></script>

<script src="{{ config('development.cdn_assets.foot_js.collect') }}"></script>


{{--提前加载vue 必备资源--}}
<script src="{{ config('development.cdn_assets.foot_js.vue') }}"></script>
<script src="{{ config('development.cdn_assets.foot_js.element_ui') }}"></script>
<script src="{{ config('development.cdn_assets.foot_js.vue_router') }}"></script>
<script src="{{ config('development.cdn_assets.foot_js.vue_store') }}"></script>
<script src="{{ config('development.cdn_assets.foot_js.axios') }}"></script>
<script src="{{ config('development.cdn_assets.foot_js.nprogress') }}"></script>
<script src="{{ config('development.cdn_assets.foot_js.mock') }}"></script>

<!-- 加载入口文件 -->
{{--<script src="{{ url('vendor/development/js/route.js') }}"></script>--}}
<script src="{{ url('vendor/development/js/main.js') }}"></script>
