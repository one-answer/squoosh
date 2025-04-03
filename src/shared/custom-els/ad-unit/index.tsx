/**
 * Google AdSense 广告单元组件
 */
import { h, Component } from 'preact';
import * as style from './style.css';
import 'add-css:./style.css';

interface Props {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  layout?: 'in-article' | 'in-feed';
  className?: string;
}

/**
 * Google AdSense 广告单元组件
 * 用于在应用程序中显示广告
 */
export default class AdUnit extends Component<Props> {
  private adRef = (el: HTMLElement | null) => {
    if (!el) return;

    // 确保 AdSense 代码已加载
    if (window.adsbygoogle) {
      try {
        // 尝试推送广告
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense 广告加载失败:', e);
      }
    }
  };

  render() {
    const {
      slot,
      format = 'auto',
      responsive = true,
      layout,
      className,
    } = this.props;

    return (
      <div class={`${style.adContainer} ${className || ''}`}>
        <ins
          ref={this.adRef}
          class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-3811349067654166"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
          {...(layout ? { 'data-ad-layout': layout } : {})}
        />
      </div>
    );
  }
}

// 声明全局 adsbygoogle 变量
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
