import { loadBlock } from '../scripts/aem.js';

export const HeroBanner = () => {
    const [heroBannerData, setHeroBannerData] = React.useState('');
    const loadData = async () => {
        const blocks = await loadBlock(document.querySelector('div.hero-banner.block'));
        const blocksHTML = blocks.outerHTML; // Convert blocks to HTML string
        setHeroBannerData(blocksHTML);
    }
    React.useEffect(() => {
        loadData();
    }, []);

    return (
        React.createElement('div', null,
            heroBannerData && React.createElement('div', { dangerouslySetInnerHTML: { __html: heroBannerData } })
        )
    );
};