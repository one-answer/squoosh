/**
 * Language selector component
 */
import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { useTranslation, LanguageContext } from 'shared/i18n';
import * as style from './style.css';
import 'add-css:./style.css';

interface Props {}

export default function LanguageSelector(props: Props) {
  const { language, setLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();

  const handleChange = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    setLanguage(select.value as any);
  };

  return (
    <div class={style.languageSelector}>
      <label class={style.label}>{t('language.select')}</label>
      <select class={style.select} value={language} onChange={handleChange}>
        <option value="en">{t('language.en')}</option>
        <option value="zh">{t('language.zh')}</option>
      </select>
    </div>
  );
}
