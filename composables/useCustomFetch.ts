import type { UseFetchOptions } from "nuxt/app";

/**
 * 自定義 useFetch 組合式函數
 * @param apiPath API 請求的路徑 (可以只填 v1/ 之後的路徑)
 * @param options nuxt 的useFetch 請求設定
 */

export default function <T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>,
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$customFetch as typeof $fetch,
  });
}
