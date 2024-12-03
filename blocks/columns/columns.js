export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  [...block.children].forEach((row, index) => {
    row.classList.add(`row`, `row${index + 1}`);
    let pic = row.querySelector("div picture");
    [...row.children].forEach((col, colindex) => {
      col.classList.add(`col`, `col${colindex + 1}`);
      const head = col.querySelector("h2");
      if (head) {
        const newhead = document.createElement("p");
        newhead.classList.add("columns-head");
        const innerem = head.querySelector("em");
        if (innerem) {
          newhead.innerHTML = innerem.innerHTML;
          innerem.remove();
        } else {
          newhead.innerHTML = head.innerHTML;
        }
        head.remove();
        col.prepend(newhead);
      }
      const p = col.querySelectorAll("p");
      if (p.length) {
        p.forEach((p) => {
          removeEm(p);
        });
      }
      const ctas = col.querySelectorAll(":scope p > a");
      if (ctas) {
        ctas?.forEach((cta) => {
          cta.classList.add("columns-cta");
        });
      }

      if (index == 2) {
        const paragraphs = col.querySelectorAll("p");
        if (paragraphs.length > 1) {
          let cta = paragraphs[paragraphs.length - 1].querySelector("a");
          cta.classList.remove("button", "columns-cta");
        }
      }

      const listcont = col.querySelectorAll(":scope ul > li");
      if (listcont.length) {
        let updatedlistcont = [];
        listcont.forEach((li) => {
          li.classList.add("columns-list");
          let str = li.innerHTML;
          const parts = str.split("-");
          const wrappedStr = `<span class="listhead">${parts[0]}</span> - ${parts[1]}`;
          updatedlistcont.push(wrappedStr);
          li.innerHTML = wrappedStr;
        });
      }

      if (index == 1 && colindex == 1) {
        createSelectOption(col);

        const paragraphs = col.querySelectorAll("p");
        const select = col.querySelector("select");
        const selectlabel = paragraphs[paragraphs.length - 2];
        const lastParagraph = paragraphs[paragraphs.length - 1];
        paragraphs[1].classList.add("columns-subhead");

        // Create a new div element
        const divouter = document.createElement("div");
        const div1 = document.createElement("div");
        const colcta = document.createElement("button");

        divouter.classList.add("columns-select-container");
        colcta.classList.add("columns-cta");
        colcta.innerHTML = lastParagraph.innerHTML;

        // Append the select element and the last paragraph to the new div
        div1.appendChild(selectlabel.cloneNode(true));
        div1.appendChild(select);
        divouter.appendChild(div1);
        divouter.appendChild(colcta);

        // Insert the new div before the last paragraph
        col.insertBefore(divouter, lastParagraph);

        // Remove the original last paragraph
        selectlabel.remove();
        lastParagraph.remove();
      }
    });

    if (pic) {
      const img = pic.querySelector("img");
      img.classList.add("columns-img");
      if (img) {
        const div = document.createElement("div");
        div.appendChild(img.cloneNode(true)); // Clone the img element and append it to the div
        pic.parentNode.replaceChild(div, pic); // Replace the picture element with the new div
      }
    }

    const wrapper = document.createElement("div")
    wrapper.classList.add("row-wrapper")
    wrapper.append(row.cloneNode(true));
    row.parentNode.replaceChild(wrapper, row);
    block.append(wrapper);
  });
}

const removeEm = (element) => {
  const innerem = element.querySelector("em");
  if (innerem) {
    element.innerHTML = innerem.innerHTML;
    innerem.remove();
  }
};

const createSelectOption = (element) => {
  const paragraphs = element.querySelectorAll("p");
  const dropdownOptions = [];

  const dropdownLabel = paragraphs[2] ? paragraphs[2]?.innerHTML : "";

  // Collect the paragraphs except the last one
  for (let i = 3; i < paragraphs.length - 1; i++) {
    dropdownOptions.push(paragraphs[i].innerHTML);
    if (i !== 3) {
      paragraphs[i].remove();
    }
  }

  // Create the dropdown
  const dropdown = document.createElement("select");
  const label = document.createElement("p");
  label.innerHTML = `<label for="condition-select">${dropdownLabel}</label>`;
  dropdown.setAttribute("id", "condition-select");

  dropdownOptions.forEach((optionText) => {
    const option = document.createElement("option");
    option.value = optionText.toLowerCase();
    option.textContent = optionText;
    dropdown.appendChild(option);
  });
  paragraphs[2].parentNode.replaceChild(label, paragraphs[2]);
  paragraphs[3].parentNode.replaceChild(dropdown, paragraphs[3]);
};
