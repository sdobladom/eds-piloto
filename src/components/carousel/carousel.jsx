import './carousel.css';
import { render, Fragment } from 'preact';
import { html } from 'htm/preact';

function Carousel({ items }) {
  return html`
      <${Fragment}>
        ${items.map((item, i) => html`
          <div className='carousel_item' key=${i}>
            <div className='image'>
                <img src="${item.img}"/>
            </div>
            <div className='text_container'>
                <div className='text_content'>
                    <h1 className='text_content-title'>${item.title}</h1>
                    ${item.paragraph.map((p, j) => html`<p className='text_content-paragraph' key=${j}>${p}</p>`)}
                    ${item.button.text && html`<button onClick=${() => window.location.href = item.button.link}>${item.button.text}</button>`}
                </div>
            </div>
          </div>
        `)}
      </${Fragment}>
  `;
}

export default function decorate(block) {

    console.log(block.innerHTML)

    const data = [...block.querySelectorAll(':scope > div')]
        .map(row => {

            const cols = row.querySelectorAll(':scope > div')

            console.log(cols)
            const size = cols.length;

            const button = {
                link: row?.querySelector('a')?.href ?? '',
                text: cols[size - 2]?.querySelector('p')?.textContent.trim() ?? ''
            }
            return {
                img: row?.querySelector('img')?.src ?? '',
                title: cols[1]?.querySelector('p')?.textContent.trim(),
                paragraph: [...(cols[2]?.querySelectorAll('p') ?? [])].map(p => p.textContent.trim()),
                button
            }
        })


    console.log(data)

  block.innerHTML = '';

  render(html`<${Carousel} items=${data} />`, block);
}