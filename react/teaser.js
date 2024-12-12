import { loadBlock } from '../scripts/aem.js';

export const Teaser = () => {
    const [teaserData, setTeaserData] = React.useState('');
    const loadData = async () => {
        const blocks = await loadBlock(document.querySelector('div.teaser.block'));
        let reactnode = blocks.querySelector('div')
        reactnode.remove()
        const teaserwrapper = document.createElement('div');
        teaserwrapper.classList.add('teaser-row-wrapper'); 

        const col2 = document.createElement('div'); 
        col2.classList.add('teaser-row-col2');
        const picture = blocks.querySelector('picture');
        if(picture){
         
              const img = picture.querySelector('img');
              if (img) {
                const div = document.createElement('div');
                div.appendChild(img.cloneNode(true)); // Clone the img element and append it to the div
                picture.parentNode.replaceChild(div, picture); // Replace the picture element with the new div
                col2.append(div.cloneNode(true));
                div.remove();
                teaserwrapper.append(col2); 
              }
            
            
      
        }


        const col1 = document.createElement('div'); 
        col1.classList.add('teaser-row-col1');
        
        let childrenblock  = blocks.querySelectorAll('div > p');
        
        if(childrenblock){
            childrenblock.forEach((childblock, index) => {
                if(childblock){
                    childrenblock.classList?.add(`textblock${index}`)
                    col1.append(childblock.cloneNode(true));
                    childblock.remove();
                }
              
       
               
            })
        }
        const lastcta = col1.querySelector('.button-container:nth-last-child(1)');
        if(lastcta){
            lastcta.classList.remove("button-container");
            lastcta.classList.add("cta-container"); 
        }
       
        teaserwrapper.prepend(col1); 
       
        blocks.append(teaserwrapper);
        const blocksHTML = blocks.outerHTML; // Convert blocks to HTML string
        setTeaserData(blocksHTML);
        
       
    
    }
    React.useEffect(() => {
        loadData();
    }, []);

    return (
        React.createElement('div', null,
            teaserData && React.createElement('div', { dangerouslySetInnerHTML: { __html: teaserData } })
        )
    );
};
