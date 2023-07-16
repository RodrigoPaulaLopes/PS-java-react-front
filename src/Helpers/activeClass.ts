

export function changeClass(target: EventTarget & HTMLInputElement, classe: string) {

    target.classList.add(classe);

    const links = document.querySelectorAll('input');
    links.forEach((link) => {
      if (link !== target) {
        link.classList.remove(classe);
      }
    });
}