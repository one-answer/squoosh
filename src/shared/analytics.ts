/**
 * Google Analytics 工具函数
 */

// 声明全局gtag函数
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * 发送页面浏览事件到Google Analytics
 * @param path 页面路径
 * @param title 页面标题
 */
export function sendPageView(path: string, title?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-NNVLKJ9W2C', {
      page_path: path,
      page_title: title,
    });
  }
}

/**
 * 发送自定义事件到Google Analytics
 * @param eventName 事件名称
 * @param eventParams 事件参数
 */
export function sendEvent(
  eventName: string,
  eventParams: Record<string, any> = {},
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}
